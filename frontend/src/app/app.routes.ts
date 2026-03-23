import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { RegisterComponent } from './pages/registeration/registeration.component';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },

  { path: 'patients', component: PatientsComponent },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', redirectTo: '' }  // fallback
];
