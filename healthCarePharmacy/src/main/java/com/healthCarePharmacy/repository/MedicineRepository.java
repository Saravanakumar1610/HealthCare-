package com.healthCarePharmacy.repository;

import com.healthCarePharmacy.model.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
    List<Medicine> findByNameContaining(String name);
}
