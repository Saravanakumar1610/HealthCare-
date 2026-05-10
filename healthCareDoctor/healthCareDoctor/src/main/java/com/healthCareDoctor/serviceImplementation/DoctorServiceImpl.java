package com.healthCareDoctor.serviceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.healthCareDoctor.model.Doctor;
import com.healthCareDoctor.repository.DoctorRepository;
import com.healthCareDoctor.service.DoctorService;
import java.util.List;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Doctor saveDoctor(Doctor doctor) {
        if (doctor.getStatus() == null || doctor.getStatus().isEmpty()) {
            doctor.setStatus("ACTIVE");
        }
        return doctorRepository.save(doctor);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public Doctor getDoctorById(Long id) {
        return doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
    }

    @Override
    public Doctor updateDoctor(Long id, Doctor doctor) {
        Doctor existing = getDoctorById(id);
        existing.setName(doctor.getName());
        existing.setSpecialization(doctor.getSpecialization());
        existing.setEmail(doctor.getEmail());
        existing.setPhone(doctor.getPhone());
        existing.setQualification(doctor.getQualification());
        existing.setExperienceYears(doctor.getExperienceYears());
        existing.setGender(doctor.getGender());
        if (doctor.getStatus() != null) {
            existing.setStatus(doctor.getStatus());
        }
        return doctorRepository.save(existing);
    }

    @Override
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }
}
