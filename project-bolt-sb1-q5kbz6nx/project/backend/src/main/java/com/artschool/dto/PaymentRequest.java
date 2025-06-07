package com.artschool.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;

public class PaymentRequest {
    @NotNull
    private Long courseId;

    @NotNull
    @Positive
    private BigDecimal amount;

    private String returnUrl;

    // Getters and Setters
    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getReturnUrl() { return returnUrl; }
    public void setReturnUrl(String returnUrl) { this.returnUrl = returnUrl; }
}