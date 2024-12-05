import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from '../../models/company';
import { GetCompaniesService } from '../../services/get-companies.service';
import { PatchCompanyService } from '../../services/patch-company.service';


@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrl: './update-company.component.css'
})
export class UpdateCompanyComponent implements OnInit{

  getRank(){
    return this.updateCompanyForm.get('rank');
  }

  getIme(){
    return this.updateCompanyForm.get('ime');
  }

  getPrihodek(){
    return this.updateCompanyForm.get('prihodek');
  }

  getDobicek(){
    return this.updateCompanyForm.get('dobicek');
  }

  getSredstva(){
    return this.updateCompanyForm.get('sredstva');
  }

  getStZaposlenih(){
    return this.updateCompanyForm.get('stZaposlenih');
  }

  public company: Company | undefined;
  public companyId!: string;

  public updateCompanyForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute,
    private _getCompaniesService: GetCompaniesService, private _patchCompanyService: PatchCompanyService
  ){
    this.updateCompanyForm = this.formBuilder.group({
      rank: ['', [Validators.required, Validators.min(1), Validators.max(500), Validators.pattern('^[0-9]*$')]],
      ime: ['', [Validators.required, Validators.minLength(2)]],
      prihodek: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      dobicek: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      sredstva: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      stZaposlenih: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  ngOnInit(): void {
    this.companyId = this.activatedRoute.snapshot.paramMap.get('id')!;

    this._getCompaniesService.getCompany(this.companyId).subscribe({
      next: (data: Company) => {
        this.company = data;
        if (this.company){
          this.patchForm();
        }
      },
      error: (error) => {
        console.error('Error fetching this company! :', error); 
      },
      complete: () => {
        console.log("Get single company request completed!")
      }
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    // Watch for changes to `company` data and update form when it’s available
    if (changes['company'] && changes['company'].currentValue) {
      this.patchForm();
    }
  }

  patchForm(){
    if (this.company) {
      this.updateCompanyForm.patchValue({
        rank: this.company.rank,
        ime: this.company.ime,
        prihodek: this.company.prihodek,
        dobicek: this.company.dobicek,
        sredstva: this.company.sredstva,
        stZaposlenih: this.company.stZaposlenih
      });
    }
  }

  redirect(){
    this.router.navigate(['/show']);
  }

  onSubmit(){
    const newCompany: Company = this.updateCompanyForm.value as Company;

    this._patchCompanyService.patch(this.companyId, newCompany)
      .subscribe({
        next: res => {
          console.log('Success!', res); 
          this.redirect();
           
        },
        error: error => {
          console.error('Error!', error);
          
        },
        complete: () => console.log('Patch company request completed!')
    });
  }
}
