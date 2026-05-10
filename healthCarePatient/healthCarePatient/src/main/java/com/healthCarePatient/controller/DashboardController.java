package com.healthCarePatient.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.healthCarePatient.dto.DashboardStats;
import com.healthCarePatient.repository.PatientRepository;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStats> getStats() {
        DashboardStats stats = new DashboardStats();
        stats.setTotalPatients(patientRepository.count());
        stats.setTotalDoctors(patientRepository.countTotalDoctors());
        stats.setTotalAppointments(patientRepository.countTotalAppointments());
        stats.setScheduledAppointments(patientRepository.countScheduledAppointments());
        stats.setCompletedAppointments(patientRepository.countCompletedAppointments());
        stats.setCancelledAppointments(patientRepository.countCancelledAppointments());
        return ResponseEntity.ok(stats);
    }
}
