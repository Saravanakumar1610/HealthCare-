package com.healthCarePharmacy.service;

import com.healthCarePharmacy.model.Medicine;
import java.util.List;

public interface MedicineService {
    Medicine addMedicine(Medicine medicine);
    List<Medicine> getAllMedicines();
    Medicine getMedicineById(Long id);
    Medicine updateStock(Long id, Integer quantity);
    void deleteMedicine(Long id);
    List<Medicine> searchMedicines(String name);
}
