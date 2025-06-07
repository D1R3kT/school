package com.artschool.controller;

import com.artschool.dto.UserDto;
import com.artschool.entity.User;
import com.artschool.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDto> getCurrentUser(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        UserDto userDto = userService.convertToDto(user);
        return ResponseEntity.ok(userDto);
    }
}