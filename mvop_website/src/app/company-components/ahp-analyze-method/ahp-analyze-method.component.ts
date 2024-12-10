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

  //matrixValues: string[][] = [];

  // This will hold the matrix values with the header name as the key
  alternativesValues: { [key: string]: string[][] } = {};

  PCcriteriaValues: string[][] = [];

  constructor(private selectedCompaniesDataService: SelectedCompaniesDataService, private router: Router, private _pythonScriptService: PythonScriptsService){
  }

  ngOnInit(): void {
    this.selectedCompaniesDataService.currentCompanies.subscribe(companies => {
      this.companies = companies;
    });
    this.initializeMatrix();
    this.initializePCcriteria();

  }

  // Initialize PCcriteria with empty values based on headers
  initializePCcriteria() {
    this.PCcriteriaValues = this.getHeaders().map(() => {
      return Array(this.getHeaders().length).fill('');
    });
  }

  getHeaders() {
    if (this.companies.length > 0) {
      return Object.keys(this.companies[0]).filter(key => key !== 'ime' && key !== '_id');
    }
    return [];
  }

  getCompanyNames() {
    return this.companies.map(company => company.ime);
  }

  initializeMatrix() {
    const headers = this.getHeaders();
    headers.forEach(header => {
      // Initialize each matrix with empty string values
      this.alternativesValues[header] = Array.from({ length: this.companies.length }, () =>
        Array(this.getCompanyNames().length).fill('')
      );
    });
  }

  // Update the matrix with the string input from ngModel
  updateCellValue(header: string, rowIndex: number, colIndex: number, value: string) {
    // Save the string representation in the matrixValues
    this.alternativesValues[header][rowIndex][colIndex] = value;
    // Optional: you could also directly store the parsedValue in another matrix for further use
  }

  convertFractionToFloat(fraction: string): number {
    if (!fraction.includes('/')) {
      return parseFloat(fraction); // Return the number itself if no fraction
    }
  
    const [numerator, denominator] = fraction.split('/').map(Number);
    const result = numerator / denominator;
    return parseFloat(result.toFixed(4)); 
  }

  // You can add a function to return the entire matrix with header names as the keys
  onSubmit() {

    // Convert fractions in alternativesValues
    for (const key in this.alternativesValues) {
      this.alternativesValues[key] = this.alternativesValues[key].map(row =>
        row.map(cell => this.convertFractionToFloat(cell).toString()) 
      );
    }

    // Convert fractions in PCcriteriaValues
    this.PCcriteriaValues = this.PCcriteriaValues.map(row =>
      row.map(cell => this.convertFractionToFloat(cell).toString())
    );

    console.log(this.PCcriteriaValues);
    console.log(this.alternativesValues);
  }

  /*
  data = {
    "PCcriteriaValues": [values inside of PCcriteriaValues array]
    ],
    "alternative_values": {
      "key1": [ values inside of key1 array
      ],
      "key2": [ values inside of key2 array
      ],
      "key3": [ values inside of key3 array
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

  */

}
