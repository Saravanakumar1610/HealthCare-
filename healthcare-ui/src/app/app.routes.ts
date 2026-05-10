import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { RegisterComponent } from './pages/registeration/registeration.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { BillingsComponent } from './pages/billings/billings.component';
import { PharmacyComponent } from './pages/pharmacy/pharmacy.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },

  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'patients', component: PatientsComponent, canActivate: [authGuard] },
  { path: 'doctors', component: DoctorsComponent, canActivate: [authGuard] },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [authGuard] },
  { path: 'billings', component: BillingsComponent, canActivate: [authGuard] },
  { path: 'pharmacy', component: PharmacyComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];
