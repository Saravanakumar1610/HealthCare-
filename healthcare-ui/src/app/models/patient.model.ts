export interface Patient {
  id?: number;
  name: string;
  age: number;
  disease: string;
  doctorAssigned: string;
  phone?: string;
  email?: string;
  gender?: string;
  address?: string;
  status?: string;
}