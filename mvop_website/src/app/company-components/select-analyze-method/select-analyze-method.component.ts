import { Component, OnInit } from '@angular/core';
import { SelectedCompaniesDataService } from '../../services/selected-companies-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-analyze-method',
  templateUrl: './select-analyze-method.component.html',
  styleUrl: './select-analyze-method.component.css'
})
export class SelectAnalyzeMethodComponent implements OnInit {

  companies: any[] = [];

  selectedMethod: string = 'ahp';

  constructor(private selectedCompaniesDataService: SelectedCompaniesDataService, private router: Router){}

  ngOnInit(): void {
    this.selectedCompaniesDataService.currentCompanies.subscribe(companies => {
      this.companies = companies;
    });
  }

  redirect(): void {
    this.router.navigate(['analyze/method/topsis'], { skipLocationChange: true });
  }

}
