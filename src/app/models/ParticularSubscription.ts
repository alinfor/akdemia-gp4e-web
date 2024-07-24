import { InterSession } from "./InterSession";
import { Particular } from "./Particular";

export interface ParticularSubscription {
  id: number;
  status: string;
  interSession: InterSession
  particular: Particular
  creationDate: Date;
  updateDate: Date;
}