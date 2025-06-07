package com.artschool.dto;

import com.artschool.entity.Payment;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class PaymentDto {
    private Long id;
    private String yookassaPaymentId;
    private String courseName;
    private BigDecimal amount;
    private Payment.PaymentStatus status;
    private String confirmationUrl;
    private LocalDateTime createdAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getYookassaPaymentId() { return yookassaPaymentId; }
    public void setYookassaPaymentId(String yookassaPaymentId) { this.yookassaPaymentId = yookassaPaymentId; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public Payment.PaymentStatus getStatus() { return status; }
    public void setStatus(Payment.PaymentStatus status) { this.status = status; }

    public String getConfirmationUrl() { return confirmationUrl; }
    public void setConfirmationUrl(String confirmationUrl) { this.confirmationUrl = confirmationUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}