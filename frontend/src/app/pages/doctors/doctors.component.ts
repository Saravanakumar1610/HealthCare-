import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit   {
  doctors: any[] = [];

  constructor(private api: ApiService) {}
  ngOnInit() {
    this.api.getDoctors().subscribe((data: any) => {
      this.doctors = data;
    });}

}
