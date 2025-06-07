package com.artschool.service;

import com.artschool.dto.PaymentDto;
import com.artschool.dto.PaymentRequest;
import com.artschool.entity.Course;
import com.artschool.entity.Payment;
import com.artschool.entity.User;
import com.artschool.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CourseService courseService;

    @Autowired
    private UserService userService;

    @Autowired
    private EnrollmentService enrollmentService;

    @Value("${yookassa.shop-id}")
    private String shopId;

    @Value("${yookassa.secret-key}")
    private String secretKey;

    @Value("${yookassa.api-url}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public PaymentDto createPayment(PaymentRequest request, User user) {
        Course course = courseService.findById(request.getCourseId());
        
        // Создаем платеж в ЮKassa
        Map<String, Object> yookassaRequest = createYookassaPaymentRequest(
                request.getAmount(), 
                course.getTitle(), 
                request.getReturnUrl(),
                user,
                course
        );

        HttpHeaders headers = createYookassaHeaders();
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(yookassaRequest, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    apiUrl + "/payments",
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            Map<String, Object> responseBody = response.getBody();
            
            // Сохраняем платеж в базе данных
            Payment payment = new Payment();
            payment.setYookassaPaymentId((String) responseBody.get("id"));
            payment.setUser(user);
            payment.setCourse(course);
            payment.setAmount(request.getAmount());
            payment.setStatus(Payment.PaymentStatus.PENDING);
            payment.setDescription("Оплата курса: " + course.getTitle());
            
            Map<String, Object> confirmation = (Map<String, Object>) responseBody.get("confirmation");
            if (confirmation != null) {
                payment.setConfirmationUrl((String) confirmation.get("confirmation_url"));
            }

            payment = paymentRepository.save(payment);
            
            return convertToDto(payment);
            
        } catch (Exception e) {
            throw new RuntimeException("Failed to create payment: " + e.getMessage());
        }
    }

    public void updatePaymentStatus(String yookassaPaymentId, String status) {
        Payment payment = paymentRepository.findByYookassaPaymentId(yookassaPaymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        Payment.PaymentStatus paymentStatus = mapYookassaStatus(status);
        payment.setStatus(paymentStatus);
        paymentRepository.save(payment);

        // Если платеж успешен, записываем пользователя на курс
        if (paymentStatus == Payment.PaymentStatus.SUCCEEDED) {
            enrollmentService.enrollUser(payment.getUser(), payment.getCourse());
        }
    }

    public List<PaymentDto> getUserPayments(Long userId) {
        return paymentRepository.findByUserId(userId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PaymentDto getPaymentByYookassaId(String yookassaPaymentId) {
        Payment payment = paymentRepository.findByYookassaPaymentId(yookassaPaymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
        return convertToDto(payment);
    }

    private Map<String, Object> createYookassaPaymentRequest(BigDecimal amount, String description, 
                                                           String returnUrl, User user, Course course) {
        Map<String, Object> request = new HashMap<>();
        
        Map<String, Object> amountMap = new HashMap<>();
        amountMap.put("value", amount.toString());
        amountMap.put("currency", "RUB");
        request.put("amount", amountMap);
        
        Map<String, Object> confirmation = new HashMap<>();
        confirmation.put("type", "redirect");
        confirmation.put("return_url", returnUrl != null ? returnUrl : "http://localhost:5173/payment/success");
        request.put("confirmation", confirmation);
        
        request.put("capture", true);
        request.put("description", description);
        
        Map<String, Object> metadata = new HashMap<>();
        metadata.put("course_id", course.getId().toString());
        metadata.put("user_id", user.getId().toString());
        metadata.put("user_email", user.getEmail());
        request.put("metadata", metadata);
        
        return request;
    }

    private HttpHeaders createYookassaHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBasicAuth(shopId, secretKey);
        headers.set("Content-Type", "application/json");
        headers.set("Idempotence-Key", UUID.randomUUID().toString());
        return headers;
    }

    private Payment.PaymentStatus mapYookassaStatus(String yookassaStatus) {
        return switch (yookassaStatus.toLowerCase()) {
            case "pending" -> Payment.PaymentStatus.PENDING;
            case "waiting_for_capture" -> Payment.PaymentStatus.WAITING_FOR_CAPTURE;
            case "succeeded" -> Payment.PaymentStatus.SUCCEEDED;
            case "canceled" -> Payment.PaymentStatus.CANCELED;
            default -> Payment.PaymentStatus.FAILED;
        };
    }

    private PaymentDto convertToDto(Payment payment) {
        PaymentDto dto = new PaymentDto();
        dto.setId(payment.getId());
        dto.setYookassaPaymentId(payment.getYookassaPaymentId());
        dto.setCourseName(payment.getCourse().getTitle());
        dto.setAmount(payment.getAmount());
        dto.setStatus(payment.getStatus());
        dto.setConfirmationUrl(payment.getConfirmationUrl());
        dto.setCreatedAt(payment.getCreatedAt());
        return dto;
    }
}