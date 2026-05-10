package com.healthCareBilling.serviceImplementation;

import com.healthCareBilling.model.Billing;
import com.healthCareBilling.repository.BillingRepository;
import com.healthCareBilling.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BillingServiceImpl implements BillingService {
    @Autowired
    private BillingRepository billingRepository;

    @Override
    public Billing createBilling(Billing billing) {
        if (billing.getStatus() == null) billing.setStatus("UNPAID");
        return billingRepository.save(billing);
    }

    @Override
    public List<Billing> getAllBillings() {
        return billingRepository.findAll();
    }

    @Override
    public Billing getBillingById(Long id) {
        return billingRepository.findById(id).orElse(null);
    }

    @Override
    public List<Billing> getBillingsByPatientId(Long patientId) {
        return billingRepository.findByPatientId(patientId);
    }

    @Override
    public Billing updateBillingStatus(Long id, String status) {
        Billing billing = getBillingById(id);
        if (billing != null) {
            billing.setStatus(status);
            return billingRepository.save(billing);
        }
        return null;
    }
}
