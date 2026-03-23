package main.java.com.healthCareSecurity.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig implements WebMvcConfigurer {
    
    // STEP 1: Tell Spring to allow requests from Angular (4200)
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Allow ALL endpoints
            .allowedOrigins(
                "http://localhost:4200",    // Angular frontend
                "http://127.0.0.1:4200",    // Alternative localhost
                "http://localhost:8080"     // Gateway
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH")  // Allow all methods
            .allowedHeaders("*")  // Allow all headers
            .exposedHeaders("Authorization", "Content-Type")  // Let frontend read these headers
            .allowCredentials(true)  // Allow cookies/tokens
            .maxAge(3600);  // Cache for 1 hour
    }

    // STEP 2: Backup CORS configuration
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        
        // Add all allowed origins
        config.setAllowedOrigins(Arrays.asList(
            "http://localhost:4200",
            "http://127.0.0.1:4200",
            "http://localhost:8080"
        ));
        
        // Allow all methods
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        
        // Allow all headers
        config.setAllowedHeaders(Arrays.asList("*"));
        
        // Expose headers
        config.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));
        
        // Allow credentials
        config.setAllowCredentials(true);
        
        // Cache
        config.setMaxAge(3600L);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    // STEP 3: Security filter chain
    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Enable CORS
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // Disable CSRF (not needed for API)
            .csrf(csrf -> csrf.disable())
            // Authorization rules
            .authorizeHttpRequests(auth -> 
                auth
                    .requestMatchers("/login", "/auth/**", "/register").permitAll()  // No auth needed
                    .anyRequest().authenticated()  // Everything else needs auth
            )
            // Disable basic auth (we're using JWT tokens)
            .httpBasic(httpBasic -> httpBasic.disable())
            // Disable form login (we're using API)
            .formLogin(form -> form.disable());

        return http.build();
    }
}