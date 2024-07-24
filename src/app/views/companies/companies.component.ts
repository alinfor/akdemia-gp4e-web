// src/app/components/companies/companies.component.ts
import { CompanyService } from 'src/app/services/company.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Company } from 'src/app/models/Company';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  companies: Company[] = [];
  isLoading: boolean = false;
  companyForm: FormGroup;
  searchForm!: FormGroup;
  filterForm!: FormGroup;

  constructor(
    private companiesService: CompanyService ,
    private fb: FormBuilder,
    private router: Router,
    private alert: AlertService
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: [''],
      industry: [''],
      creationDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadCompanies();
    this.initForm();
  }

  loadCompanies() {
    this.isLoading = true;
    this.companiesService.getAll().subscribe(
      (data: Company[]) => {
        this.companies = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Failed to load companies', error);
        this.isLoading = false;
      }
    );
  }

  searchByName() {
    const keyword = this.searchForm.value.keyWord.toLowerCase().trim();
    this.companies = this.companies.filter(company =>
      company.name.toString().toLowerCase().includes(keyword)
    );
  }

  initForm() {
    this.searchForm = new FormGroup({
      keyWord: new FormControl('')
    });

    this.filterForm = new FormGroup({
      filter: new FormControl(20)
    });

    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: [''],
      industry: [''],
      creationDate: ['']
    });
  }

  companyDetail(id: number) {
    this.router.navigate([`dashboard/companies/infos/${id}`]);
  }

  onSubmit() {
    if (this.companyForm.valid) {
      this.companiesService.save(this.companyForm.value).subscribe(
        data => {
          this.isLoading = false;
          Swal.fire(
            'Ajouté!',
            "L'entreprise a été ajoutée avec succès.",
            'success'
          );
          setTimeout(() => {
            this.companyForm.reset();
            this.loadCompanies();
          }, 1000);
        },
        (err) => {
          this.alert.alertError(err.error !== null ? err.error.message : 'Une erreur s\'est produite lors de l\'ajout de l\'entreprise');
        }
      );
    } else {
      console.log('Le formulaire n\'est pas valide');
    }
  }
}
