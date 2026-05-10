package com.healthCarePatient.service;

import com.healthCarePatient.model.Patient;
import java.util.List;

public interface PatientService {
    Patient savePatient(Patient patient);
    List<Patient> getAllPatients();
    Patient getPatientById(Long id);
    Patient updatePatient(Long id, Patient patient);
    void deletePatient(Long id);
}
