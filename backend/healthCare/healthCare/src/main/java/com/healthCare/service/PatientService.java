package com.healthCare.service;

import java.util.List;

import com.healthCare.model.Patient;

public interface PatientService {

	public Patient savePatient(Patient patient);

	public List<Patient> getAllPatients();

	public Patient getPatientById(Long id);

	public Patient updatePatient(Long id, Patient patient);

	public void deletePatient(Long id);
}
