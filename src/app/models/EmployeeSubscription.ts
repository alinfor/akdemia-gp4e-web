import { Employee } from "./Employee";
import { IntraSession } from "./IntraSession";

export interface EmployeeSubscription {
  id: number;
  status: string;
  intraSession: IntraSession
  employee: Employee
  creationDate: Date;
  updateDate: Date;
}