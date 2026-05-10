package com.healthCarePatient.dto;

public class DashboardStats {
    private long totalPatients;
    private long totalDoctors;
    private long totalAppointments;
    private long scheduledAppointments;
    private long completedAppointments;
    private long cancelledAppointments;

    public DashboardStats() {}

    public long getTotalPatients() { return totalPatients; }
    public void setTotalPatients(long totalPatients) { this.totalPatients = totalPatients; }
    public long getTotalDoctors() { return totalDoctors; }
    public void setTotalDoctors(long totalDoctors) { this.totalDoctors = totalDoctors; }
    public long getTotalAppointments() { return totalAppointments; }
    public void setTotalAppointments(long totalAppointments) { this.totalAppointments = totalAppointments; }
    public long getScheduledAppointments() { return scheduledAppointments; }
    public void setScheduledAppointments(long scheduledAppointments) { this.scheduledAppointments = scheduledAppointments; }
    public long getCompletedAppointments() { return completedAppointments; }
    public void setCompletedAppointments(long completedAppointments) { this.completedAppointments = completedAppointments; }
    public long getCancelledAppointments() { return cancelledAppointments; }
    public void setCancelledAppointments(long cancelledAppointments) { this.cancelledAppointments = cancelledAppointments; }
}
