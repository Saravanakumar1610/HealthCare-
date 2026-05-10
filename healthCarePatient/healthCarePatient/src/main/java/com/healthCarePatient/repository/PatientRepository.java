package com.healthCarePatient.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.healthCarePatient.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    @Query(value = "SELECT count(*) FROM doctors", nativeQuery = true)
    long countTotalDoctors();

    @Query(value = "SELECT count(*) FROM appointments", nativeQuery = true)
    long countTotalAppointments();

    @Query(value = "SELECT count(*) FROM appointments WHERE status = 'SCHEDULED'", nativeQuery = true)
    long countScheduledAppointments();

    @Query(value = "SELECT count(*) FROM appointments WHERE status = 'COMPLETED'", nativeQuery = true)
    long countCompletedAppointments();

    @Query(value = "SELECT count(*) FROM appointments WHERE status = 'CANCELLED'", nativeQuery = true)
    long countCancelledAppointments();
}
