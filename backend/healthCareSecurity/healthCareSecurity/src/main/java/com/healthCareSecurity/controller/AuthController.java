	package com.healthCareSecurity.controller;
	
	
	import java.util.Map;
	
	import org.springframework.beans.factory.annotation.Autowired;
	import org.springframework.http.ResponseEntity;
	import org.springframework.web.bind.annotation.*;
	
	import com.healthCareSecurity.jwtUtility.JwtUtility;
	import com.healthCareSecurity.model.User;
	import com.healthCareSecurity.repository.UserRepository;
	@RestController
	@RequestMapping("/")
	//@CrossOrigin(origins = {"http://localhost:4200", "http://localhost:8080"}, allowCredentials = "true")
	public class AuthController {
	
	    @Autowired
	    private JwtUtility jwtUtil;
	
	    @Autowired
	    private UserRepository userRepo;
	
	    @PostMapping("/login")
	    public ResponseEntity<?> login(@RequestBody User user) {
	
	        User dbUser = userRepo.findByUsername(user.getUsername());
	
	        if (dbUser != null && dbUser.getPassword().equals(user.getPassword())) {
	            String token = jwtUtil.generateToken(user.getUsername());
	            return ResponseEntity.ok(Map.of("token", token, "username", user.getUsername()));
	        }
	
	        return ResponseEntity.status(401).body(Map.of("error", "Invalid Credentials"));
	    
	    }
	}