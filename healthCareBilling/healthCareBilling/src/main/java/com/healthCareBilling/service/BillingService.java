package com.healthCareBilling.service;

import com.healthCareBilling.model.Billing;
import java.util.List;

public interface BillingService {
    Billing createBilling(Billing billing);
    List<Billing> getAllBillings();
    Billing getBillingById(Long id);
    List<Billing> getBillingsByPatientId(Long patientId);
    Billing updateBillingStatus(Long id, String status);
}
