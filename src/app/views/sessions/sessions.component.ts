import { Training } from './../../models/Training';
import { TrainingService } from './../../services/training.service';
import { TrainerService } from './../../services/trainer.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Session } from 'src/app/models/Session';
import { Trainer } from 'src/app/models/Trainer';
import { InterSessionService } from 'src/app/services/inter-session.service';
import { IntraSessionService } from 'src/app/services/intra-session.service';
import { SessionService } from 'src/app/services/session.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';
import { Status } from '../../models/Status.enum';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.scss']
})
export class SessionsComponent implements OnInit {
  allSessionsReserved: Session[] = [];
  sessions: Session[] = [];
  trainers: Trainer[]=[];
  trainings: Training[]=[];
  statuses = Object.values(Status);
  
  
  isInterSessionView = false;
  isIntraSessionView = false;
  isSessionView = false;
  isLoading: boolean = false;
  sessionForm: FormGroup;
  searchForm!: FormGroup;
  filterForm!: FormGroup;
  

  constructor(
    private sessionService: SessionService,
    private interSessionService: InterSessionService,
    private intraSessionService: IntraSessionService,
    private trainerService: TrainerService,
    private trainingService :TrainingService,
    private fb: FormBuilder,
    private router: Router,
    private alert: AlertService
  ) {
    this.sessionForm = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      location: [''],
      duration: [''],
      price: [''],
      status: [''],
      date: [''], // Date de début
      creationDate: [''], // Date de création (à désactiver car remplie automatiquement)
    });
  }

  ngOnInit(): void {
    this.loadSessions();
    this.loadTrainers();
  this.loadTraining();
  this.initForm();

  }

  loadSessions() {
    this.isLoading = true;
    this.isInterSessionView = false;
    this.isIntraSessionView = false;
    this.isSessionView =true;
    this.sessionService.getAll().subscribe(
      (data: Session[]) => {
        this.sessions = data;
        this.allSessionsReserved = data;
        this.allSessionsReserved = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Failed to load sessions', error);
        this.isLoading = false;
      }
    );
  }

  loadInterSessions() {
    this.isLoading = true;
    this.isInterSessionView = true;
    this.isIntraSessionView = false;
    this.isSessionView =false;
    this.interSessionService.getAll().subscribe(
      (data: Session[]) => {
        this.sessions = data;
        this.isLoading = false;
        console.log(this.sessions)

      },
      (error) => {
        console.error('Failed to load inter-sessions', error);
        this.isLoading = false;
      }
    );
  }

  loadIntraSessions() {
    this.isLoading = true;
    this.isInterSessionView = false;
    this.isIntraSessionView = true;
    this.isSessionView =false;
    
    this.intraSessionService.getAll().subscribe(
      (data: Session[]) => {
        this.sessions = data;
        this.isLoading = false;
        this.allSessionsReserved = data;
        console.log(this.sessions)
      },
      (error) => {
        console.error('Failed to load intra-sessions', error);
        this.isLoading = false;
      }
    );
  }
  loadTrainers(): void {
    this.isLoading = true;
    this.trainerService.getAll().subscribe(
      (data: Trainer[]) => {
        this.trainers = data;
        this.isLoading = false;
        console.log(this.trainers)
      },
      (error) => {
        console.error('Failed to load trainers', error);
        this.isLoading = false;
      }
    );
  }
  loadTraining(): void {
    this.isLoading = true;
    this.trainingService.getAll().subscribe(
      (data: Training[]) => {
        this.trainings = data;
        this.isLoading = false;
        console.log(this.trainings)
      },
      (error) => {
        console.error('Failed to load trainers', error);
        this.isLoading = false;
      }
    );
  }
  searchByCode() {
    
    const keyword = this.searchForm.value.keyWord.toLowerCase().trim();
    console.log(keyword)
    // Filtrer les sessions par le code de session
    this.sessions = this.allSessionsReserved.filter(session =>
      session.code.toString().toLowerCase().includes(keyword)
    );

  }
  
  initForm() {
    this.searchForm = new FormGroup({
      keyWord: new FormControl('')
    });

    this.filterForm = new FormGroup({
      filter: new FormControl(20)
    })
    this.sessionForm = this.fb.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      location: [''],
      duration: [''],
      price: [''],
      statue:[''],
      date: [''], // Date de début
      creationDate: [''], // Date de création (à désactiver car remplie automatiquement)
    });

    console.log(this.sessionForm)
  }
  sessionDetail(id: number) {
    this.router.navigate([`dashboard/sessions/infos/${id}`]);
  } 

  onSubmit() {
    if (this.sessionForm.valid) {
      console.log(this.sessionForm.value);
      this.sessionService.save(this.sessionForm.value).subscribe(
        data => {
          this.isLoading = false;
          Swal.fire(
            'Ajouté!',
            "La session a été ajoutée avec succès.",
            'success'
          );
          setTimeout(() => {
            this.sessionForm.reset();
            window.location.reload();
          }, 1000);
        },
        (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de l\'ajout de l\'employé');
        }
      )
    } else {
      console.log('Le formulaire n\'est pas valide');
    }
  }
}
