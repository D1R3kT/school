package com.artschool.dto;

import com.artschool.entity.Course;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

public class CourseDto {
    private Long id;
    private String title;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private String duration;
    private Course.Level level;
    private Set<String> features;
    private String teacherName;
    private LocalDateTime createdAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public Course.Level getLevel() { return level; }
    public void setLevel(Course.Level level) { this.level = level; }

    public Set<String> getFeatures() { return features; }
    public void setFeatures(Set<String> features) { this.features = features; }

    public String getTeacherName() { return teacherName; }
    public void setTeacherName(String teacherName) { this.teacherName = teacherName; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}