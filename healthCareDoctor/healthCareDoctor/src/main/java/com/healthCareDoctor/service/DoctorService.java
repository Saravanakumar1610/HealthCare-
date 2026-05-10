package com.healthCareDoctor.service;

import com.healthCareDoctor.model.Doctor;
import java.util.List;

public interface DoctorService {
    Doctor saveDoctor(Doctor doctor);
    List<Doctor> getAllDoctors();
    Doctor getDoctorById(Long id);
    Doctor updateDoctor(Long id, Doctor doctor);
    void deleteDoctor(Long id);
}
