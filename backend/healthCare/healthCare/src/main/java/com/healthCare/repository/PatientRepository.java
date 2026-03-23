package com.healthCare.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.healthCare.model.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long>{

}
