package com.artschool.repository;

import com.artschool.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Optional<Payment> findByYookassaPaymentId(String yookassaPaymentId);
    List<Payment> findByUserId(Long userId);
    List<Payment> findByCourseId(Long courseId);
    List<Payment> findByUserIdAndCourseId(Long userId, Long courseId);
}