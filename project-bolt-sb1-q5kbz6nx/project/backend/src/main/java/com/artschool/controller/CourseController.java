package com.artschool.controller;

import com.artschool.dto.CourseDto;
import com.artschool.entity.Course;
import com.artschool.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping
    public ResponseEntity<List<CourseDto>> getAllCourses() {
        List<CourseDto> courses = courseService.getAllActiveCourses();
        return ResponseEntity.ok(courses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseDto> getCourseById(@PathVariable Long id) {
        CourseDto course = courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<List<CourseDto>> getCoursesByLevel(@PathVariable Course.Level level) {
        List<CourseDto> courses = courseService.getCoursesByLevel(level);
        return ResponseEntity.ok(courses);
    }
}