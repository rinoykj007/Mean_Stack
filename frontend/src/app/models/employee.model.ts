export interface Employee {
  _id?: string;
  name: string;
  position: string;
  level: string;
  salary?: number;
  hireDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  // Add any other fields that your employee model has
}
