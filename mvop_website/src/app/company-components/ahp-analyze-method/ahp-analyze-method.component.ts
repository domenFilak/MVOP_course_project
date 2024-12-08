import { Component, OnInit } from '@angular/core';
import { SelectedCompaniesDataService } from '../../services/selected-companies-data.service';
import { Router } from '@angular/router';
import { PythonScriptsService } from '../../services/python-scripts.service';

@Component({
  selector: 'app-ahp-analyze-method',
  templateUrl: './ahp-analyze-method.component.html',
  styleUrl: './ahp-analyze-method.component.css'
})
export class AhpAnalyzeMethodComponent implements OnInit {

  companies: any[] = [];

  constructor(private selectedCompaniesDataService: SelectedCompaniesDataService, private router: Router, private _pythonScriptService: PythonScriptsService){

  }

  ngOnInit(): void {
    this.selectedCompaniesDataService.currentCompanies.subscribe(companies => {
      this.companies = companies;
    });
  }



}
