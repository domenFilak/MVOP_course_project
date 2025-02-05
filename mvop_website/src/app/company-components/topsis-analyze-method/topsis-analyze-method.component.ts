import { Component, OnInit } from '@angular/core';
import { SelectedCompaniesDataService } from '../../services/selected-companies-data.service';
import { Router } from '@angular/router';
import { PythonScriptsService } from '../../services/python-scripts.service';

@Component({
  selector: 'app-topsis-analyze-method-component',
  templateUrl: './topsis-analyze-method.component.html',
  styleUrl: './topsis-analyze-method.component.css'
})
export class TopsisAnalyzeMethodComponent implements OnInit {

  companies: any[] = [];

  isMax: boolean[] = [false, false, false, false, false]; // Vrednosti preferečne vrednosti SO shranjene PO KLIKU ANALIZIRAJ
  errors: string[] = [];

  weights: number[] = [0, 0, 0, 0, 0]; // Vrednosti uteži SO shranjene PO KLIKU ANALIZIRAJ, pripravljeno ZA PYTHON
  transformedIsMaxArray: string[] = []; //pripravljeno ZA PYTHON


  results: any[] = []; // To store the topsis method python data
  finalResults: any[] = []; // Stores the combined data of IME and TOPSIS OCENA

  maxTopsisOcena: any; //SHRANI NAJVIŠJO

  constructor(private selectedCompaniesDataService: SelectedCompaniesDataService, private router: Router, private _pythonScriptService: PythonScriptsService){}

  ngOnInit(): void {

    this.results = [];
    this.finalResults = [];

    this.selectedCompaniesDataService.currentCompanies.subscribe(companies => {
      this.companies = companies;
    });
  }
  
  validate(): void {
    this.errors = []; // Ponastavi napake
    const weightsSum = this.weights.reduce((acc, weight) => acc + weight, 0);
    const allWeightsFilled = this.weights.every((weight) => weight !== null && weight !== undefined && weight !== 0);

    if (!allWeightsFilled) {
      this.errors.push('Vsa polja za uteži morajo biti izpolnjena.');
    }

    if (Math.abs(weightsSum - 1) >= 1e-10) {
      this.errors.push(`Uteži morajo biti skupno enake 1. Trenutna vsota: ${weightsSum.toFixed(2)}`);
    }

    if (this.errors.length === 0){
      //priprava za python skripto, transofmracije vrednosti v ustrezen format kot ga zahteva sama python funkcija
      this.transformedIsMaxArray = this.isMax.map(value => (value ? 'max' : 'min'));

      const matrix = this.companies.map(company => [
        parseFloat(company.rank), // Convert to number
        parseFloat(company.prihodek),
        parseFloat(company.dobicek),
        parseFloat(company.sredstva),
        parseInt(company.stZaposlenih, 10) // Convert to integer
      ]);

      const data = {
        weights: this.weights,
        criterion_type: this.transformedIsMaxArray, // Convert boolean to 'max' or 'min'
        dataset: matrix
      };

      console.log(data);

      this._pythonScriptService.postTopsis(data)
      .subscribe({
        next: res => {
          console.log('Success running python topsis script!', res);
          this.results = res.result; //flask poslje JSON z naslovom polja "result": ...
          this.results = this.results.map(result => parseFloat(result.toFixed(2))); //zaokrozevanje...
          this.maxTopsisOcena = Math.max(...this.results);
          this.combineResults();
          sessionStorage.setItem('topsisResults', JSON.stringify(this.finalResults));
        },
        error: error => {
          console.error('Error!', error);
        },
        complete: () => console.log('Python topsis request completed!')
    });
    }

  }

  combineResults() {
    this.finalResults = this.companies.map((company, index) => ({
      ime: company.ime,
      topsisOcena: this.results[index] || 0 // Match TOPSIS OCENA to the company
    }));
  }


}
