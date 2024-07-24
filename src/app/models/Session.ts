// session.interface.ts
import { Trainer } from './Trainer'; // Assurez-vous d'importer correctement le modèle de Trainer
import { Company } from './Company'; // Assurez-vous d'importer correctement le modèle de Company

export interface Session {
  id: number;
  code: number;
  duration: number;
  price: number;
  description: string;
  status: string;
  date: Date;
  location: string;
  sessionScore: number | null;
  creationDate: Date | null;
  updateDate: Date;
  trainer: Trainer;
  akdemiaTrainer: number | null;
  company?: Company; // Ajoutez la propriété company comme optionnelle
  minParticipants?: number; // Ajoutez la propriété minParticipants comme optionnelle
}
