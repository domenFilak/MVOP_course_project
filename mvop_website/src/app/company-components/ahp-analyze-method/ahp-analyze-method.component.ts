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

  data = {
    "PCcriteria": [
      [1, 6, 5],
      [0.16666666666666666, 1, 0.16666666666666666],
      [0.2, 6, 1]
    ],
    "alternatives_array": {
      "PCM1": [
        [1, 0.16666666666666666, 0.3333333333333333], 
        [6, 1, 2], 
        [3, 0.5, 1]
      ],
      "PCM2": [
        [1, 0.25, 0.3333333333333333], 
        [4, 1, 7], 
        [3, 0.14285714285714285, 1]
      ],
      "PCM3": [
        [1, 0.125, 3], 
        [8, 1, 0.125], 
        [0.3333333333333333, 8, 1]
      ]
    }
  };


  onSubmit() {
    this._pythonScriptService.postAhp(this.data).subscribe({
      next: res => {
        console.log('Success running python ahp script!', res);
      },
      error: error => {
        console.error('Error!', error);
      },
      complete: () => console.log('Python ahp request completed!')
    });
  }

}
