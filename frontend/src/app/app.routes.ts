import { Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
  },
];
