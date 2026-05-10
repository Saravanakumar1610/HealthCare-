package com.healthCarePharmacy.serviceImplementation;

import com.healthCarePharmacy.model.Medicine;
import com.healthCarePharmacy.repository.MedicineRepository;
import com.healthCarePharmacy.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class MedicineServiceImpl implements MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;

    @Override
    public Medicine addMedicine(Medicine medicine) {
        return medicineRepository.save(medicine);
    }

    @Override
    public List<Medicine> getAllMedicines() {
        return medicineRepository.findAll();
    }

    @Override
    public Medicine getMedicineById(Long id) {
        return medicineRepository.findById(id).orElse(null);
    }

    @Override
    public Medicine updateStock(Long id, Integer quantity) {
        Medicine med = getMedicineById(id);
        if (med != null) {
            med.setStockQuantity(quantity);
            return medicineRepository.save(med);
        }
        return null;
    }

    @Override
    public void deleteMedicine(Long id) {
        medicineRepository.deleteById(id);
    }

    @Override
    public List<Medicine> searchMedicines(String name) {
        return medicineRepository.findByNameContaining(name);
    }
}
