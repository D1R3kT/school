package com.artschool.service;

import com.artschool.dto.UserDto;
import com.artschool.entity.User;
import com.artschool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));
    }

    public User createUser(String name, String email, String password) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(User.Role.STUDENT);

        return userRepository.save(user);
    }

    public UserDto convertToDto(User user) {
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setAvatarUrl(user.getAvatarUrl());
        dto.setRole(user.getRole());
        dto.setCreatedAt(user.getCreatedAt());
        
        List<String> enrolledCourses = user.getEnrollments().stream()
                .map(enrollment -> enrollment.getCourse().getTitle())
                .collect(Collectors.toList());
        dto.setEnrolledCourses(enrolledCourses);

        return dto;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}