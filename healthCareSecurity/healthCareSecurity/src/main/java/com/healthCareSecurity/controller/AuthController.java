package com.healthCareSecurity.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.healthCareSecurity.jwtUtility.JwtUtility;
import com.healthCareSecurity.model.User;
import com.healthCareSecurity.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private JwtUtility jwtUtil;

    @Autowired
    private UserRepository userRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User dbUser = userRepo.findByUsername(user.getUsername());

        if (dbUser != null && dbUser.getPassword().equals(user.getPassword())) {
            String token = jwtUtil.generateToken(dbUser.getUsername(), dbUser.getRole());
            return ResponseEntity.ok(Map.of(
                "token", token,
                "username", dbUser.getUsername(),
                "role", dbUser.getRole(),
                "fullName", dbUser.getFullName() != null ? dbUser.getFullName() : dbUser.getUsername()
            ));
        }

        return ResponseEntity.status(401).body(Map.of("error", "Invalid Credentials"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Check if username already exists
        User existing = userRepo.findByUsername(user.getUsername());
        if (existing != null) {
            return ResponseEntity.status(409).body(Map.of("message", "Username already exists"));
        }

        // Set default role if not provided
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("PATIENT");
        }

        User saved = userRepo.save(user);
        return ResponseEntity.ok(Map.of(
            "message", "User registered successfully",
            "username", saved.getUsername()
        ));
    }
}
