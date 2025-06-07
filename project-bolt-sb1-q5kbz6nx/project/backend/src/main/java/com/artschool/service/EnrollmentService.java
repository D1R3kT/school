package com.artschool.service;

import com.artschool.entity.Course;
import com.artschool.entity.Enrollment;
import com.artschool.entity.User;
import com.artschool.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    public Enrollment enrollUser(User user, Course course) {
        // Проверяем, не записан ли уже пользователь на курс
        if (enrollmentRepository.existsByUserIdAndCourseId(user.getId(), course.getId())) {
            throw new RuntimeException("User is already enrolled in this course");
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setUser(user);
        enrollment.setCourse(course);
        enrollment.setProgress(0);
        enrollment.setStatus(Enrollment.EnrollmentStatus.ACTIVE);

        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getUserEnrollments(Long userId) {
        return enrollmentRepository.findByUserId(userId);
    }

    public void updateProgress(Long enrollmentId, Integer progress) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        
        enrollment.setProgress(progress);
        
        if (progress >= 100) {
            enrollment.setStatus(Enrollment.EnrollmentStatus.COMPLETED);
        }
        
        enrollmentRepository.save(enrollment);
    }
}