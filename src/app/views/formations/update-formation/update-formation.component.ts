import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Training } from 'src/app/models/Training';
import { TrainingService } from 'src/app/services/training.service';
import { SubTheme } from 'src/app/models/SubTheme';
import { SubThemeService } from 'src/app/services/sub-theme.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { tap } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-update-formation',
  templateUrl: './update-formation.component.html',
  styleUrls: ['./update-formation.component.scss']
})
export class UpdateFormationComponent implements OnInit {
  id!: number;
  trainingDetail: Training = {
    id: 0,
    title: '',
    description: '',
    trainingPrice: 0,
    logo:'',
    creationDate: new Date(),
    updateDate: new Date(),
    subThemes: [],
    requirement: {
      id: 0,
      name: '',
      description: '',
      link: '',
      creationDate: new Date(),
      updateDate: new Date()
    }
  };

  formationFormUpdate!: FormGroup;
  listSubthemeSelected: SubTheme[] = [];
  imageSrc!: any;
  listSubThemes: SubTheme[] = [];
  isFormTrainingLoading!: boolean;

  constructor(
    private route: ActivatedRoute,
    private trainingService: TrainingService,
    private subThemeService: SubThemeService,
    private sanitizer: DomSanitizer,
    private alert: AlertService,
    private formBuilder: FormBuilder,
    private toastService: AlertService,
    private router: Router,
  ){
      this.formationFormUpdate = this.formBuilder.group({
        id: ['', Validators.required],
        title: ['', Validators.required],
        description: ['', Validators.required],
        subThemes: [this.listSubthemeSelected],
        trainingPrice: ['', Validators.required],
        logo: ['', Validators.required],
        creationDate: ['', Validators.required]
      });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.handlerGetTrainingById();
    this.getAllSubTheme();
    this.initForm();
  }

  initForm() {
    this.formationFormUpdate = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      description: new FormControl(''),
      trainingPrice: new FormControl(''),
      creationDate: new FormControl(''),
      subThemes: new FormControl([])
    });
  }

  handlerGetTrainingById(){
    this.trainingService.getById(this.id).subscribe(
      (data)=>{
        this.trainingDetail = data;
        this.listSubthemeSelected = this.trainingDetail.subThemes;
        this.imageSrc = this.trainingDetail.logo;
        this.formationFormUpdate.patchValue({
          id: data.id,
          title: data.title,
          description: data.description,
          trainingPrice: data.trainingPrice,
          logo: data.logo,
          creationDate: data.creationDate,
          subThemes: data.subThemes
        });
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : "une erreur s'est produite");
      }
    );
  }

  getAllSubTheme(){
    this.subThemeService.getAll().subscribe(
      (data)=>{
        this.listSubThemes = data;
      },
      (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de récupérer les sous-thèmes');
      }
    );
  }

  isSelected(subTheme: SubTheme): boolean{
    return this.listSubthemeSelected.some(selectedSubTheme => selectedSubTheme.id === subTheme.id);
  }

  selectImage(event: any): void {
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

  updateTraining(){
    this.isFormTrainingLoading = true;
    let trainingUpdate = this.formationFormUpdate.value;
    const trainingId = this.id;
    console.log(trainingUpdate);
    let creationDate = trainingUpdate.creationDate;
    trainingUpdate.updateDate = new Date();
    trainingUpdate.logo = this.imageSrc;

    this.trainingService.edit(trainingId, trainingUpdate).pipe(
      tap(
        (value) => {
          let trainingResponse = value;
          this.toastService.alertSuccess("Modification effectuée avec succès!");
          this.isFormTrainingLoading = false;
          this.formationFormUpdate.reset();
          this.router.navigate(['dashboard/catalogues/formations']);
        },
        (error) =>{
          console.log(error);
          if(error.error == null){
            this.toastService.alertError("Une erreur est survenue lors de l'enregistrement d'une formation");
            this.isFormTrainingLoading = false;
          }else{
            this.toastService.alertError(error.error.message);
            this.isFormTrainingLoading = false;
          }
        }
      )
    ).subscribe();
  }

  cancel(){
    this.router.navigate(['/dashboard/catalogues/formations']);
  }

}
