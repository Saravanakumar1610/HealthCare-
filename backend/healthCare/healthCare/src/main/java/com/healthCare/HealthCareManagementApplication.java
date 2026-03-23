package com.healthCare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EntityScan(basePackages = "com.healthCare")
@EnableJpaRepositories(basePackages = "com.healthCare")
@EnableWebSecurity
public class HealthCareManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthCareManagementApplication.class, args);
	}

}
