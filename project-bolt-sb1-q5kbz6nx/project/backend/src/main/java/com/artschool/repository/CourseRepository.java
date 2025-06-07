package com.artschool.repository;

import com.artschool.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByIsActiveTrue();
    
    @Query("SELECT c FROM Course c WHERE c.isActive = true AND c.level = :level")
    List<Course> findByLevelAndIsActiveTrue(Course.Level level);
    
    @Query("SELECT c FROM Course c WHERE c.isActive = true AND c.teacher.id = :teacherId")
    List<Course> findByTeacherIdAndIsActiveTrue(Long teacherId);
}