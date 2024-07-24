import { Requirement } from "./Requirement";
import { SubTheme } from "./SubTheme";

export interface Training {
    id: number;
    title: string;
    description: string;
    trainingPrice: number;
    logo: string;
    creationDate: Date;
    updateDate: Date;
    subThemes: SubTheme[];
    requirement: Requirement
}
