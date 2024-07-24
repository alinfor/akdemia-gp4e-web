import { Employee } from "./Employee";
import { User } from "./User";

export interface Company extends User {
    id: number;
    activity: string;
    name: string;
    employees: Employee[];
} 