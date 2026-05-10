# MedVault - Healthcare Microservices Monorepo

This repository contains the full stack of the MedVault Healthcare Management System, including 8 Spring Boot microservices and an Angular frontend.

## Architecture
- **Gateway**: Entry point for all requests.
- **Security**: JWT-based authentication and user management.
- **Patient/Doctor/Appointment**: Core domain services.
- **Billing/Pharmacy**: Auxiliary management services.
- **Frontend**: Premium Angular dashboard.

## CI/CD
This project uses **GitHub Actions** for continuous integration and is configured for one-click deployment via **Render Blueprints**.
