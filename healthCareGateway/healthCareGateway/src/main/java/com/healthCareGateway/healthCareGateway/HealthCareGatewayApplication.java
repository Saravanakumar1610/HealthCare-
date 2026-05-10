package com.healthCareGateway.healthCareGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.healthCareGateway")
public class HealthCareGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(HealthCareGatewayApplication.class, args);
	}

}
