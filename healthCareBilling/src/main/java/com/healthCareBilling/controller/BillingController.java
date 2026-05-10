package com.healthCareBilling.controller;

import com.healthCareBilling.model.Billing;
import com.healthCareBilling.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/billings")
public class BillingController {
    @Autowired
    private BillingService billingService;

    @PostMapping
    public Billing createBilling(@RequestBody Billing billing) {
        return billingService.createBilling(billing);
    }

    @GetMapping
    public List<Billing> getAllBillings() {
        return billingService.getAllBillings();
    }

    @GetMapping("/{id}")
    public Billing getBillingById(@PathVariable Long id) {
        return billingService.getBillingById(id);
    }

    @GetMapping("/patient/{patientId}")
    public List<Billing> getByPatientId(@PathVariable Long patientId) {
        return billingService.getBillingsByPatientId(patientId);
    }

    @PatchMapping("/{id}/status")
    public Billing updateStatus(@PathVariable Long id, @RequestParam String status) {
        return billingService.updateBillingStatus(id, status);
    }
}
