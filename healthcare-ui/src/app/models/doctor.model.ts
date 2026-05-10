export interface Doctor {
  id?: number;
  name: string;
  specialization: string;
  email: string;
  phone: string;
  qualification?: string;
  experienceYears?: number;
  gender?: string;
  status?: string;
}