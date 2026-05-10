package com.healthCareAppointment.serviceImplementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.healthCareAppointment.model.Appointment;
import com.healthCareAppointment.repository.AppointmentRepository;
import com.healthCareAppointment.service.AppointmentService;
import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public Appointment saveAppointment(Appointment appointment) {
        if (appointment.getStatus() == null || appointment.getStatus().isEmpty()) {
            appointment.setStatus("SCHEDULED");
        }
        return appointmentRepository.save(appointment);
    }

    @Override
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @Override
    public Appointment getAppointmentById(Long id) {
        return appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
    }

    @Override
    public Appointment updateAppointment(Long id, Appointment appointment) {
        Appointment existing = getAppointmentById(id);
        existing.setPatientId(appointment.getPatientId());
        existing.setPatientName(appointment.getPatientName());
        existing.setDoctorId(appointment.getDoctorId());
        existing.setDoctorName(appointment.getDoctorName());
        existing.setAppointmentDate(appointment.getAppointmentDate());
        existing.setAppointmentTime(appointment.getAppointmentTime());
        existing.setStatus(appointment.getStatus());
        existing.setNotes(appointment.getNotes());
        existing.setReason(appointment.getReason());
        return appointmentRepository.save(existing);
    }

    @Override
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    @Override
    public List<Appointment> getAppointmentsByPatientId(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    @Override
    public List<Appointment> getAppointmentsByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @Override
    public List<Appointment> getAppointmentsByStatus(String status) {
        return appointmentRepository.findByStatus(status);
    }
}
