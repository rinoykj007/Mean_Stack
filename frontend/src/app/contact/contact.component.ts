import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EmployeeListComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent implements OnInit {
  employeeForm!: FormGroup;
  currentEmployeeId: string = ''; // Store the ID of the employee being edited
  showEmployeeList: boolean = false; // Toggle between form and list views
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      level: ['Junior', Validators.required],
    });
    
    this.loadEmployees();
  }
  
  // Clear error and reset loading state
  loadEmployees(): void {
    this.error = '';
    this.loading = false;
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const employee: Employee = {
        name: this.employeeForm.value.name,
        position: this.employeeForm.value.position,
        level: this.employeeForm.value.level,
      };

      if (!this.currentEmployeeId) {
        // Add new employee
        this.employeeService.createEmployee(employee).subscribe({
          next: (createdEmployee) => {
            this.loadEmployees(); // Reload all employees
            this.resetForm();
          },
          error: (error) => {
            this.error = 'Error creating employee: ' + error.message;
          }
        });
      } else {
        // Update existing employee
        this.employeeService.updateEmployee(this.currentEmployeeId, employee).subscribe({
          next: (updatedEmployee) => {
            this.loadEmployees(); // Reload all employees
            this.resetForm();
          },
          error: (error) => {
            this.error = 'Error updating employee: ' + error.message;
          }
        });
      }
    } else {
      // Mark all form controls as touched to trigger validation messages
      Object.keys(this.employeeForm.controls).forEach((key) => {
        const control = this.employeeForm.get(key);
        control?.markAsTouched();
      });
    }
  }
  
  resetForm(): void {
    this.employeeForm.reset({
      name: '',
      position: '',
      level: 'Junior',
    });
    this.currentEmployeeId = '';
  }
  
  setLevel(level: string): void {
    this.employeeForm.patchValue({ level });
  }

  editEmployee(id: string): void {
    this.employeeService.getEmployee(id).subscribe({
      next: (employee) => {
        // Set form values to the employee being edited
        this.employeeForm.patchValue({
          name: employee.name,
          position: employee.position,
          level: employee.level || 'Junior',
        });

        // Set edit mode with the employee ID
        this.currentEmployeeId = id;
      },
      error: (error) => {
        this.error = 'Error fetching employee details: ' + error.message;
      }
    });
  }

  // Handle employee deletion from the list component
  deleteEmployee(id: string): void {
    // If we were editing this employee, reset the form
    if (this.currentEmployeeId === id) {
      this.resetForm();
    }
  }
}
