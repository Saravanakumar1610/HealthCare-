package com.healthCareGateway.configuration;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@EnableReactiveMethodSecurity
public class GatewaySecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {

        return http
            .csrf(csrf -> csrf.disable())

            // CORS CONFIG
            .cors(cors -> cors.configurationSource(exchange -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
                config.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE","OPTIONS"));
                config.setAllowedHeaders(Arrays.asList("*"));
                config.setAllowCredentials(true);
                return config;
            }))

            // AUTHORIZATION RULES
            .authorizeExchange(exchanges -> exchanges
                // Allow OPTIONS preflight
                .pathMatchers(HttpMethod.OPTIONS).permitAll()
                // Public APIs (auth)
                .pathMatchers("/api/auth/**").permitAll()
                // All other APIs just need authentication (JWT filter handles it)
                .anyExchange().authenticated()
            )

            // Error Handlers
            .exceptionHandling(ex -> ex
                .authenticationEntryPoint((exchange, e) -> {
                    exchange.getResponse().setStatusCode(
                        org.springframework.http.HttpStatus.UNAUTHORIZED);
                    return exchange.getResponse().setComplete();
                })
                .accessDeniedHandler((exchange, e) -> {
                    exchange.getResponse().setStatusCode(
                        org.springframework.http.HttpStatus.FORBIDDEN);
                    return exchange.getResponse().setComplete();
                })
            )

            .build();
    }
}
