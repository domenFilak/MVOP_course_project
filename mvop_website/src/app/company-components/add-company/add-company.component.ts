import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddCompanyService } from '../../services/add-company.service';

import { Company } from '../../models/company';


@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrl: './add-company.component.css'
})
export class AddCompanyComponent {

  getRank(){
    return this.addCompanyForm.get('rank');
  }

  getIme(){
    return this.addCompanyForm.get('ime');
  }

  getPrihodek(){
    return this.addCompanyForm.get('prihodek');
  }

  getDobicek(){
    return this.addCompanyForm.get('dobicek');
  }

  getSredstva(){
    return this.addCompanyForm.get('sredstva');
  }

  getStZaposlenih(){
    return this.addCompanyForm.get('stZaposlenih');
  }

  constructor(private formBuilder: FormBuilder, private _addCompanyService: AddCompanyService){}

  public errorMessage: string | null = null;
  public successMessage: string | null = null;


  public addCompanyForm = this.formBuilder.group({
    rank: ['', [Validators.required, Validators.min(1), Validators.max(500), Validators.pattern('^[0-9]*$')]],
    ime: ['', [Validators.required, Validators.minLength(2)]],
    prihodek: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    dobicek: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    sredstva: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
    stZaposlenih: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
  });

  onSubmit(){

    const newCompany: Company = this.addCompanyForm.value as Company;
    
    this._addCompanyService.add(newCompany)
      .subscribe({
        next: res => {
          console.log('Success!', res); 
          this.errorMessage = null;
          this.successMessage = 'Podjetje uspešno dodano!';
          this.addCompanyForm.reset();  
        },
        error: error => {
          console.error('Error!', error);
          this.successMessage = null;
          this.errorMessage = 'Pri dodajanju podjetja je prišlo do napake. Prosimo poskusite znova.'; 
          
        },
        complete: () => console.log('Add company request completed!')
    });
    
    this.addCompanyForm.reset();
  }


}
