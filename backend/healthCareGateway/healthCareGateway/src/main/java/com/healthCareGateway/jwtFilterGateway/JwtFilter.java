package com.healthCareGateway.jwtFilterGateway;

import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;

import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
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
        return -1;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {

        String path = exchange.getRequest().getURI().getPath();
        String method = exchange.getRequest().getMethod().toString();

        System.out.println("JwtFilter - Incoming Request: " + method + " " + path);

        // ✅ Skip authentication for public endpoints
        if (path.equals("/api/login") || path.equals("/api/register") || 
            path.startsWith("/auth") || path.startsWith("/login")) {
            System.out.println("JwtFilter - Allowing public endpoint: " + path);
            return chain.filter(exchange);
        }

        // ✅ Skip preflight OPTIONS requests
        if (exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
            System.out.println("JwtFilter - Allowing OPTIONS preflight");
            return chain.filter(exchange);
        }

        String authHeader = exchange.getRequest()
                .getHeaders()
                .getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("JwtFilter - No valid token, returning 401");
            return unauthorized(exchange);
        }

        String token = authHeader.substring(7);

        try {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();

            String username = claims.getSubject();

            System.out.println("JwtFilter - Authenticated User: " + username);

            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            username,
                            null,
                            Collections.singletonList(
                                    new SimpleGrantedAuthority("ROLE_USER"))
                    );

            return chain.filter(exchange)
                    .contextWrite(
                            ReactiveSecurityContextHolder.withAuthentication(authentication)
                    );

        } catch (Exception e) {
            System.out.println("JwtFilter - Token validation failed: " + e.getMessage());
            e.printStackTrace();
            return unauthorized(exchange);
        }
    }

    private Mono<Void> unauthorized(ServerWebExchange exchange) {
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    }
}