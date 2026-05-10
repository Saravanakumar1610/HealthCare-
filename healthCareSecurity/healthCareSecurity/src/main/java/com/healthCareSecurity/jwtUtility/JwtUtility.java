package com.healthCareSecurity.jwtUtility;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtility {


    private final SecretKey key = Keys.hmacShaKeyFor(
            "mySuperSecretKeyForHealthcareApplication1234567890".getBytes()
    );

    public String generateToken(String username, String role) {

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)   // ✅ ADD THIS
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 20))
                .signWith(key)
                .compact();
    }}