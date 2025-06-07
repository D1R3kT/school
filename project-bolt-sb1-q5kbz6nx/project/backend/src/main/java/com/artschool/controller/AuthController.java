package com.artschool.controller;

import com.artschool.dto.AuthRequest;
import com.artschool.dto.AuthResponse;
import com.artschool.dto.RegisterRequest;
import com.artschool.dto.UserDto;
import com.artschool.entity.User;
import com.artschool.service.JwtService;
import com.artschool.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = (User) authentication.getPrincipal();
        String token = jwtService.generateToken(user);
        UserDto userDto = userService.convertToDto(user);

        return ResponseEntity.ok(new AuthResponse(token, userDto));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        User user = userService.createUser(request.getName(), request.getEmail(), request.getPassword());
        String token = jwtService.generateToken(user);
        UserDto userDto = userService.convertToDto(user);

        return ResponseEntity.ok(new AuthResponse(token, userDto));
    }
}