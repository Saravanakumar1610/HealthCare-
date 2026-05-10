package com.healthCarePatient.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @Min(value = 0, message = "Age must be a positive number")
    @Max(value = 150, message = "Age must be less than 150")
    private Integer age;

    @NotBlank(message = "Disease/condition is required")
    private String disease;

    @Column(name = "doctor_assigned")
    private String doctorAssigned;

    private String phone;
    private String email;

    @Column(length = 10)
    private String gender;

    private String address;

    @Column(length = 20)
    private String status;

    public Patient() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
    public String getDisease() { return disease; }
    public void setDisease(String disease) { this.disease = disease; }
    public String getDoctorAssigned() { return doctorAssigned; }
    public void setDoctorAssigned(String doctorAssigned) { this.doctorAssigned = doctorAssigned; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
