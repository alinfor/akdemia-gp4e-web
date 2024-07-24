import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {SubTheme} from 'src/app/models/SubTheme';
import {Training} from 'src/app/models/Training';
import {AlertService} from 'src/app/services/alert.service';
import {SubThemeService} from 'src/app/services/sub-theme.service';
import {TrainingService} from 'src/app/services/training.service';
import {tap} from "rxjs";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UtilsService } from 'src/app/services/utils.service';


@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationsComponent implements OnInit {
  
  nouvelleFormationVisible: boolean = false;

  formationForm!: FormGroup;
  listSubThemes: SubTheme[] = [];
  trainingValue!: Training;
  imageSrc!: any;
  allTrainings: Training[] = [];
  isLoading!: boolean;
  isFormTrainingLoading!: boolean;

    //for search
    allTrainingsReserved: Training[] = [];
    trainingSearch: Training[] = [];
    //for filter
    filterForm!: FormGroup;
    searchForm!: FormGroup;
    //for pagination
    page: number = 1;
    position: number = 1;

  constructor(
    private trainingService: TrainingService,
    private subThemeService: SubThemeService,
    private toastService: AlertService,
    private alert: AlertService,
    private sanitizer: DomSanitizer,
    private utilsService: UtilsService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.getAllTraining();
    this.getAllSubThemes();
    this.initForm();
  }

  searchByName() {
    this.allTrainings = this.allTrainingsReserved;
    let table: Training[] = [];
    for (let i = 0; i < this.allTrainings.length; i++) {
      if (this.allTrainings[i].title.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())) {
        table.push(this.allTrainings[i]);
      }
    }
    if (this.searchForm.value.keyWord.trim() == "") {
      this.allTrainings = this.allTrainingsReserved;
    } else {
      this.allTrainings = table;
    }
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  getAllTraining() {
    this.isLoading = true;
    this.trainingService.getAll()
      .subscribe(
        next => {this.allTrainings = next; this.allTrainingsReserved = next; this.isLoading = false;},
        (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les particuliers');
        }
  )
  }

  toggleDown() {
    this.nouvelleFormationVisible = !this.nouvelleFormationVisible;
  }

  getAllSubThemes() {
    this.isLoading = true;
    this.subThemeService.getAll().subscribe(
      (data) => {
        this.listSubThemes = data;
        this.isLoading = false;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les sous-thèmes');
      }
    );
  }

  initForm() {
    this.formationForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      trainingPrice: new FormControl(''),
      logo: new FormControl(''),
      subThemes: new FormControl([])
    });

    this.searchForm = new FormGroup({
      keyWord: new FormControl('')
    });

    this.filterForm = new FormGroup({
      filter: new FormControl(20)
    })
  }

  saveFormation() {
    this.isFormTrainingLoading = true;
    let trainingSave = this.createTraining();
    this.trainingService.save(trainingSave).pipe(
      tap(
        (value) => {
          let trainingResponse = value;
          this.toastService.alertSuccess("Enregistrement effectué avec succès !");
          this.isFormTrainingLoading = false;
          this.formationForm.reset();
          setTimeout(() => {
            this.formationForm.reset();
            window.location.reload();
          }, 1000);
        },
        (error) => {
          console.log(error);
          if (error.error == null) {
            this.toastService.alertError("Une erreur est survenue lors de l'enregistrement d'une formation");
            this.isFormTrainingLoading = false;
          } else {
            this.toastService.alertError(error.error.message);
            this.isFormTrainingLoading = false;
          }
        }
      )
    ).subscribe();


  }

  createTraining(): Training {
    console.log("SUBTHEMES" + this.formationForm.value.subThemes)
    this.trainingValue = this.formationForm.value;
    this.trainingValue.logo = this.imageSrc;
    return this.trainingValue;
  }

  onImageSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      // Lire le fichier et générer une URL de données (data URL)
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        const test: any = this.sanitizer.bypassSecurityTrustUrl(base64Image);
        this.imageSrc = test.changingThisBreaksApplicationSecurity?.split(',')[1];
      };
      reader.readAsDataURL(file);
    }
  }

  goToUpdate(id: number){
    this.router.navigate(['dashboard/catalogues/formations/update/', id]);
  }

  deleteTraining(id: number){
    Swal.fire({
      title: 'Etes-vous sûr de vouloir effectuer cette suppression?',
      text: 'Cette action est irréversible!',
      icon: 'warning',
      cancelButtonText: 'Annuler',
      showCancelButton: true,
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer!',
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.trainingService.delete(id).subscribe(() => {
          this.getAllTraining();
          Swal.fire(
            'Supprimé!',
            'La formation a été supprimée avec succès.',
            'success'
          );
        },
        (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de supprimer la formation');
        });
      }
    });
  }

  resetTraining(){
    this.formationForm.reset();
    this.nouvelleFormationVisible = false;
  }

  getSubString(text: string) {
    return this.utilsService.getSubString(text, 30);
  }

  goToTheme() {
    window.location.replace('dashboard/catalogues/themes');
  }

}
