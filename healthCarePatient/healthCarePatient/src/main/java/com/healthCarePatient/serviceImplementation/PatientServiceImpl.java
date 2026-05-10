package com.healthCarePatient.serviceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.healthCarePatient.model.Patient;
import com.healthCarePatient.repository.PatientRepository;
import com.healthCarePatient.service.PatientService;
import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Patient savePatient(Patient patient) {
        if (patient.getStatus() == null || patient.getStatus().isEmpty()) {
            patient.setStatus("ACTIVE");
        }
        return patientRepository.save(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
    }

    @Override
    public Patient updatePatient(Long id, Patient patient) {
        Patient existing = getPatientById(id);
        existing.setName(patient.getName());
        existing.setAge(patient.getAge());
        existing.setDisease(patient.getDisease());
        existing.setDoctorAssigned(patient.getDoctorAssigned());
        existing.setPhone(patient.getPhone());
        existing.setEmail(patient.getEmail());
        existing.setGender(patient.getGender());
        existing.setAddress(patient.getAddress());
        if (patient.getStatus() != null) {
            existing.setStatus(patient.getStatus());
        }
        return patientRepository.save(existing);
    }

    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}
