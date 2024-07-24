import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Trainer } from 'src/app/models/Trainer';
import { AlertService } from 'src/app/services/alert.service';
import { TrainerService } from 'src/app/services/trainer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-formateurs',
  templateUrl: './formateurs.component.html',
  styleUrls: ['./formateurs.component.scss']
})
export class FormateursComponent implements OnInit {
  trainers: Trainer[] = [];
  isLoading!: boolean;

      //for search
      allTrainersReserved: Trainer[] = [];
      trainerSearch: Trainer[] = [];
      //for filter
      filterForm!: FormGroup;
      searchForm!: FormGroup;
      //for pagination
      page: number = 1;
      position: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private trainerService: TrainerService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.getAllTrainers();
    this.initForm();
  }

  getAllTrainers() {
    this.isLoading = true;
    this.trainerService.getAll().subscribe(
      data => {
        this.trainers = data;
        this.allTrainersReserved = data;
        this.isLoading = false;
      }
    )
  }

  searchByName() {
    this.trainers = this.allTrainersReserved;
    let table: Trainer[] = [];
    for (let i = 0; i < this.trainers.length; i++) {
      if (this.trainers[i].email.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())
      || this.trainers[i].firstname.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())
      || this.trainers[i].lastname.toLowerCase().includes(this.searchForm.value.keyWord.toLowerCase())) {
        table.push(this.trainers[i]);
      }
    }
    if (this.searchForm.value.keyWord.trim() == "") {
      this.trainers = this.allTrainersReserved;
    } else {
      this.trainers = table;
    }
  }

  handlePageChange(event: number) {
    this.page = event;
  }

  goToEdit(id: number) {
    this.router.navigateByUrl(`dashboard/formateurs/${id}`);
  }

  initForm() {
    this.searchForm = new FormGroup({
      keyWord: new FormControl('')
    });

    this.filterForm = new FormGroup({
      filter: new FormControl(20)
    })
  }

  deleteTrainer(id: number) {
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
      if(result.isConfirmed) {
        this.trainerService.delete(id).subscribe(
          () => {
            this.getAllTrainers();
            Swal.fire(
              'Supprimé!',
              'Le formateur a été supprimé avec succès.',
              'success'
            );
          },
          (err) => {
            this.alert.alertError(err.error !== null ? err.error.message : 'Impossible de supprimer un formateur');
          })
      }
    })

  }

}
