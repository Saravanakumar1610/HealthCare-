package com.healthCareDoctor.service;

import java.util.List;

import com.healthCareDoctor.model.Doctor;

public interface DoctorService {


	public Doctor saveDoctor(Doctor doctor);

	public List<Doctor> getAllDoctors();

	public Doctor getDoctorById(Long id);

	public Doctor updateDoctor(Long id, Doctor doctor);

	public void deleteDoctor(Long id);
}