package com.healthCare.serviceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthCare.model.Patient;
import com.healthCare.repository.PatientRepository;
import com.healthCare.service.PatientService;


import java.util.List;


@Service
public class PatientServiceImpl implements PatientService {

	@Autowired
    private  PatientRepository patientRepository;

	public PatientServiceImpl(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
    }
	
    @Override
    public Patient savePatient(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @Override
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    @Override
    public Patient updatePatient(Long id, Patient patient) {
        Patient existing = getPatientById(id);
        existing.setName(patient.getName());
        existing.setAge(patient.getAge());
        existing.setDisease(patient.getDisease());
        existing.setDoctorAssigned(patient.getDoctorAssigned());
        return patientRepository.save(existing);
    }

    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}
