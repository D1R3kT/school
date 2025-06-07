package com.artschool.controller;

import com.artschool.dto.PaymentDto;
import com.artschool.dto.PaymentRequest;
import com.artschool.entity.User;
import com.artschool.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/create")
    public ResponseEntity<PaymentDto> createPayment(@Valid @RequestBody PaymentRequest request, 
                                                   Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        PaymentDto payment = paymentService.createPayment(request, user);
        return ResponseEntity.ok(payment);
    }

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody Map<String, Object> payload) {
        try {
            Map<String, Object> object = (Map<String, Object>) payload.get("object");
            String paymentId = (String) object.get("id");
            String status = (String) object.get("status");
            
            paymentService.updatePaymentStatus(paymentId, status);
            
            return ResponseEntity.ok("OK");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing webhook");
        }
    }

    @GetMapping("/user")
    public ResponseEntity<List<PaymentDto>> getUserPayments(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        List<PaymentDto> payments = paymentService.getUserPayments(user.getId());
        return ResponseEntity.ok(payments);
    }

    @GetMapping("/{yookassaPaymentId}")
    public ResponseEntity<PaymentDto> getPayment(@PathVariable String yookassaPaymentId) {
        PaymentDto payment = paymentService.getPaymentByYookassaId(yookassaPaymentId);
        return ResponseEntity.ok(payment);
    }
}