import { User } from "./User";

export interface Trainer extends User{
    id: number;
    activity: string;
    cv_link: string;
    firstname: string;
    lastname: string;
    gender: string;
    id_akdemia_validation_test: number;
}
