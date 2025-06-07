package com.artschool.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 200)
    @Column(name = "title", nullable = false)
    private String title;

    @NotBlank
    @Size(max = 1000)
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @NotNull
    @Positive
    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @NotBlank
    @Size(max = 50)
    @Column(name = "duration", nullable = false)
    private String duration;

    @Enumerated(EnumType.STRING)
    @Column(name = "level", nullable = false)
    private Level level;

    @ElementCollection
    @CollectionTable(name = "course_features", joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "feature")
    private Set<String> features = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private User teacher;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Enrollment> enrollments = new HashSet<>();

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Payment> payments = new HashSet<>();

    public enum Level {
        BEGINNER, INTERMEDIATE, ADVANCED, ALL_LEVELS
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

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

    public Level getLevel() { return level; }
    public void setLevel(Level level) { this.level = level; }

    public Set<String> getFeatures() { return features; }
    public void setFeatures(Set<String> features) { this.features = features; }

    public User getTeacher() { return teacher; }
    public void setTeacher(User teacher) { this.teacher = teacher; }

    public Boolean getIsActive() { return isActive; }
    public void setIsActive(Boolean isActive) { this.isActive = isActive; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public Set<Enrollment> getEnrollments() { return enrollments; }
    public void setEnrollments(Set<Enrollment> enrollments) { this.enrollments = enrollments; }

    public Set<Payment> getPayments() { return payments; }
    public void setPayments(Set<Payment> payments) { this.payments = payments; }
}