import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './patients.component.html',
  styleUrl: './patients.component.css'
})

export class PatientsComponent implements OnInit {

  patients: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getPatients().subscribe((data: any) => {
      this.patients = data;
    });
  }
}