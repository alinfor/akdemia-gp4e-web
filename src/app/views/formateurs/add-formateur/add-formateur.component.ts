import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Trainer } from 'src/app/models/Trainer';
import { AlertService } from 'src/app/services/alert.service';
import { TrainerService } from 'src/app/services/trainer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-formateur',
  templateUrl: './add-formateur.component.html',
  styleUrls: ['./add-formateur.component.scss']
})
export class AddFormateurComponent implements OnInit {
  constructor(
    private trainerService: TrainerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private alert: AlertService,
    private route: ActivatedRoute
  ) {}

  trainerForm!: FormGroup;
  trainerValue!: Trainer;
  updateTrainerForm!: FormGroup;
  idTrainer!: any;
  isLoading!: boolean;
  isFormEdit!: boolean;


  ngOnInit(): void {
    this.idTrainer = this.route.snapshot.paramMap.get('id');
    console.log(this.idTrainer);
    if(this.idTrainer) {
      this.getById(this.idTrainer);
      this.isFormEdit = true;
    }
    this.initForm();
  }

  cancel(){
    this.router.navigate(['dashboard/formateurs']);
  }

  initForm() {
    this.trainerForm = new FormGroup({
      id: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      activity: new FormControl(''),
      phone: new FormControl(''),
      photo: new FormControl(''),
      gender: new FormControl('M'),
      creationDate: new FormControl(new Date())
    });
  }



  getById(id: number) {
    this.trainerService.getById(id).subscribe({
      next: data => {
        this.trainerForm.patchValue(data);
      },
      error: (err) => {
        this.alert.alertError(err.error !== null ? err.error.message : "Impossible de récupérer l'identifiant");
      }
    })
  }


  createTrainer() {
    this.isLoading = true;
    let form = this.trainerForm.value;
    if(this.idTrainer)  {
      this.trainerService.edit(this.idTrainer, form).subscribe(
        data => {
          this.isLoading = false;
          Swal.fire(
            'Modifié!',
            'Le formateur a été modifié avec succès.',
            'success'
          );

          this.router.navigate(['dashboard/formateurs']);
        },
        (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : "une erreur s'est produite lors de la modification du formateur");
        }
      )

    } else {
      this.trainerService.save(form).subscribe(
        data => {
          this.isLoading = false;
          Swal.fire(
            'Ajouté!',
            'Le formateur a été ajouté avec succès.',
            'success'
          );
          console.log(this.trainerForm.value);
          this.router.navigate(['dashboard/formateurs']);
        },
        (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : "Une erreur s'est produite lors de l'ajout du formateur");
        }
      )
    }

  }

}
