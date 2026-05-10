export interface Appointment {
  id?: number;
  patientId: number;
  patientName?: string;
  doctorId: number;
  doctorName?: string;
  appointmentDate: string;
  appointmentTime: string;
  status?: string;
  notes?: string;
  reason?: string;
}
