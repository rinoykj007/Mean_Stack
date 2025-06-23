import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = false;
  error = '';
  
  @Output() editEmployee = new EventEmitter<string>();
  @Output() deleteEmployee = new EventEmitter<string>();
  
  constructor(private employeeService: EmployeeService) {}
  
  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading employees: ' + error.message;
        this.loading = false;
      }
    });
  }
  
  onEdit(id: string): void {
    this.editEmployee.emit(id);
  }
  
  onDelete(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next: () => {
          this.loadEmployees(); // Reload the list after deletion
        },
        error: (error) => {
          this.error = 'Error deleting employee: ' + error.message;
        }
      });
    }
  }
  
  // onAddNew method removed as it's no longer needed
}
