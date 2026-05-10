package com.healthCareGateway.jwtFilterGateway;

import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;

import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import java.util.Collections;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtFilter implements WebFilter, Ordered {

    private static final String SECRET =
            "mySuperSecretKeyForHealthcareApplication1234567890";

    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes());

    @Override
    public int getOrder() {
        // Must run BEFORE Spring Security filter chain
        return -200;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();

        // Public APIs - skip JWT processing
        if (path.startsWith("/api/auth")) {
            return chain.filter(exchange);
        }

        // Allow preflight
        if (exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
            return chain.filter(exchange);
        }

        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);

        // No token - continue (Spring Security will return 401)
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return chain.filter(exchange);
        }

        String token = authHeader.substring(7);

        try {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            String username = claims.getSubject();
            String role = claims.get("role", String.class);

            // Normalize role
            if (role != null && !role.startsWith("ROLE_")) {
                role = "ROLE_" + role;
            }

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(
                            username,
                            null,
                            Collections.singletonList(
                                    new SimpleGrantedAuthority(role))
                    );

            return chain.filter(exchange)
                    .contextWrite(
                            ReactiveSecurityContextHolder.withAuthentication(auth)
                    );

        } catch (Exception e) {
            System.out.println("JWT Error: " + e.getMessage());
            return chain.filter(exchange);
        }
    }
}
