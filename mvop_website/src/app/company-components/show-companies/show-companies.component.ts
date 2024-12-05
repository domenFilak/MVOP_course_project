import { Component, OnInit } from '@angular/core';

import { Company } from '../../models/company';
import { GetCompaniesService } from '../../services/get-companies.service';
import { DeleteCompanyService } from '../../services/delete-company.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-show-companies',
  templateUrl: './show-companies.component.html',
  styleUrl: './show-companies.component.css'
})
export class ShowCompaniesComponent implements OnInit{

  public companies: Company[] = [];
  public errorMessage: string | null = null;

  constructor(private _getCompaniesService: GetCompaniesService, private _deleteCompanyService: DeleteCompanyService,
              private router: Router
  ){}

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this._getCompaniesService.get().subscribe({
      next: (data: Company[]) => {
        this.companies = data;
      },
      error: (error) => {
        console.error('Error fetching companies! :', error);
        this.errorMessage = null;
        this.errorMessage = 'Prišlo je do napake pri sprejemanju podatkov iz serverja. Prosimo poskusite pozneje.';  
      },
      complete: () => {
        console.log("Get companies request completed!")
      }
    });
  }

  deleteCompany(companyId: string) {
    this._deleteCompanyService.deleteCompany(companyId).subscribe({
      next: (response) => {
        console.log('Company deleted successfully!', response);
        this.fetchCompanies();
      },
      error: (error) => {
        console.error('Error deleting the company! :', error);
        this.errorMessage = null;
        this.errorMessage = 'Pri dodajanju podjetja je prišlo do napake. Prosimo poskusite znova.'; 
      }
    });
  }

  redirect(companyId: string){
    this.router.navigate(['/show/update/'+companyId], { skipLocationChange: true });
  }

}
