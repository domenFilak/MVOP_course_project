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

  // Function to evaluate fractions (e.g., '1/3' -> 0.333333...)
  parseFraction(value: string): number {
    if (value.includes('/')) {
      const [numerator, denominator] = value.split('/').map(part => parseFloat(part.trim()));
      return numerator / denominator;
    }
    return parseFloat(value); // Return as a float if not a fraction
  }

  // Update the matrix with the string input from ngModel
  updateCellValue(header: string, rowIndex: number, colIndex: number, value: string) {
    const parsedValue = this.parseFraction(value); // Parse the value to float
    // Save the string representation in the matrixValues
    this.alternativesValues[header][rowIndex][colIndex] = value;
    // Optional: you could also directly store the parsedValue in another matrix for further use
  }

  // You can add a function to return the entire matrix with header names as the keys
  onSubmit() {
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
