package com.healthCareGateway.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
public class GatewaySecurityConfig {
	@Bean
	public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
	    http
	        .csrf(csrf -> csrf.disable())
	        .authorizeExchange(exchange ->
	            exchange
	                .pathMatchers("/api/login", "/api/register").permitAll()
	                .pathMatchers("/auth/**").permitAll()
	                .anyExchange().permitAll()
	        );

	    return http.build();
	}
}