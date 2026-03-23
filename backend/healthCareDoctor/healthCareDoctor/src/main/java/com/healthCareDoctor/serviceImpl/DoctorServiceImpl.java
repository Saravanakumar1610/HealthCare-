package com.healthCareDoctor.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.healthCareDoctor.model.Doctor;
import com.healthCareDoctor.repository.DoctorRepository;
import com.healthCareDoctor.service.DoctorService;
@Service

public class DoctorServiceImpl implements DoctorService{
	@Autowired
	private  DoctorRepository doctorRepository;
	
	public DoctorServiceImpl(DoctorRepository doctorRepository) {
		this.doctorRepository=doctorRepository;
	}

    @Override
    public Doctor saveDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    @Override
    public Doctor updateDoctor(Long id, Doctor doctor) {
        Doctor existing = getDoctorById(id);
        existing.setName(doctor.getName());
        existing.setSpecialization(doctor.getSpecialization());
        existing.setEmail(doctor.getEmail());
        existing.setPhone(doctor.getPhone());
        return doctorRepository.save(existing);
    }

    @Override
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}
