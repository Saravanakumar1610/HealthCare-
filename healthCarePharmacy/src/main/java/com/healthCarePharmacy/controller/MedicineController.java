package com.healthCarePharmacy.controller;

import com.healthCarePharmacy.model.Medicine;
import com.healthCarePharmacy.service.MedicineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pharmacy")
public class MedicineController {
    @Autowired
    private MedicineService medicineService;

    @PostMapping
    public Medicine addMedicine(@RequestBody Medicine medicine) {
        return medicineService.addMedicine(medicine);
    }

    @GetMapping
    public List<Medicine> getAll() {
        return medicineService.getAllMedicines();
    }

    @GetMapping("/{id}")
    public Medicine getById(@PathVariable Long id) {
        return medicineService.getMedicineById(id);
    }

    @PatchMapping("/{id}/stock")
    public Medicine updateStock(@PathVariable Long id, @RequestParam Integer quantity) {
        return medicineService.updateStock(id, quantity);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        medicineService.deleteMedicine(id);
    }

    @GetMapping("/search")
    public List<Medicine> search(@RequestParam String name) {
        return medicineService.searchMedicines(name);
    }
}
