package com.artschool.service;

import com.artschool.dto.CourseDto;
import com.artschool.entity.Course;
import com.artschool.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<CourseDto> getAllActiveCourses() {
        return courseRepository.findByIsActiveTrue().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public CourseDto getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return convertToDto(course);
    }

    public Course findById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    public List<CourseDto> getCoursesByLevel(Course.Level level) {
        return courseRepository.findByLevelAndIsActiveTrue(level).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private CourseDto convertToDto(Course course) {
        CourseDto dto = new CourseDto();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setImageUrl(course.getImageUrl());
        dto.setPrice(course.getPrice());
        dto.setDuration(course.getDuration());
        dto.setLevel(course.getLevel());
        dto.setFeatures(course.getFeatures());
        dto.setTeacherName(course.getTeacher() != null ? course.getTeacher().getName() : null);
        dto.setCreatedAt(course.getCreatedAt());
        return dto;
    }
}