import { Component } from '@angular/core';
import { GetCompaniesService } from '../../services/get-companies.service';
import { Company } from '../../models/company';
import { Router } from '@angular/router';
import { SelectedCompaniesDataService } from '../../services/selected-companies-data.service';

@Component({
  selector: 'app-select-analyze-companies',
  templateUrl: './select-analyze-companies.component.html',
  styleUrl: './select-analyze-companies.component.css'
})
export class SelectAnalyzeCompaniesComponent {
  public companies: Company[] = [];
  public errorMessage: string | null = null;

  public selectedCompanies: Company[] = [];

  public twoSelected: boolean = false;

  constructor(private _getCompaniesService: GetCompaniesService, private router: Router, private selectedCompaniesDataService: SelectedCompaniesDataService){}

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

  toggleSelection(index: number): void {
    const selectedCompany = this.companies[index];
    const isSelected = this.selectedCompanies.includes(selectedCompany);

    if (isSelected) {
      this.selectedCompanies = this.selectedCompanies.filter(company => company !== selectedCompany);
    } else {
      this.selectedCompanies.push(selectedCompany);
    }
  }

  // Check if a row is selected
  isSelected(index: number): boolean {
    return this.selectedCompanies.includes(this.companies[index]);
  }

  // Select or deselect all checkboxes
  toggleSelectAll(event: any): void {
    if (event.target.checked) {
      this.selectedCompanies = [...this.companies];  // Select all companies
    } else {
      this.selectedCompanies = [];  // Deselect all companies
    }
  }

  redirect(){
    this.selectedCompanies = this.selectedCompanies.sort((a, b) => parseInt(a.rank) - parseInt(b.rank));

    this.selectedCompaniesDataService.changeCompanies(this.selectedCompanies);
    this.router.navigate(['analyze/method'], { skipLocationChange: true });
  }
}
