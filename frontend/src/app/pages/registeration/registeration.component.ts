import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { Doctor } from '../../models/doctor.model';
import { Patient } from '../../models/patient.model';


@Component({
  selector: 'app-registeration',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './registeration.component.html',
  styleUrl: './registeration.component.css'
})

export class RegisterComponent {

  // 🔑 Type selector
  type: string = 'patient';

  // Patient model
  patient:Patient = {
    name: '',
    age: 0,
    disease: '',
    doctorAssigned: ''
  };

  // Doctor model
  doctor:Doctor = {
    name: '',
    specialization: '',
    email: '',
    phone: ''
  };

  constructor(private api: ApiService, private router: Router) {}

submit() {
  if (this.type === 'patient') {

    const payload = {
      ...this.patient,
      age: Number(this.patient.age)   // ✅ FIX
    };

    this.api.addPatient(payload).subscribe({
      next: () =>{
         alert('Patient Registered Successfully');
       this.router.navigate(['/patients']);
    }
  });

  } else {
    this.api.addDoctor(this.doctor).subscribe({
      next: () => alert('Doctor Registered Successfully'),
      error: err => console.error(err)
    });
  }
}
}