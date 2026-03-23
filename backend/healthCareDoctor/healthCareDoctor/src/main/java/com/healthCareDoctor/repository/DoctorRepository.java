	package com.healthCareDoctor.repository;
	
	import org.springframework.data.jpa.repository.JpaRepository;
	
	import com.healthCareDoctor.model.Doctor;
	
	public interface DoctorRepository extends JpaRepository<Doctor, Long> {
	
	}
