import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-results',
  templateUrl: './display-results.component.html',
  styleUrl: './display-results.component.css'
})
export class DisplayResultsComponent implements OnInit{

  selectedMethod: string = 'all';
  ahpResults: any[] = [];
  prometheeResults: any[] = [];
  topsisResults: any[] = [];
  wsmResults: any[] = [];

  // Variables to store the maximum value for each result
  maxAHP: number = 0;
  maxPromethee: number = 0;
  maxTopsis: number = 0;
  maxWSM: number = 0;


  ngOnInit(): void {
    // Load results from sessionStorage
    this.ahpResults = JSON.parse(sessionStorage.getItem('ahpResults') || '[]');
    this.prometheeResults = JSON.parse(sessionStorage.getItem('prometheeResults') || '[]');
    this.topsisResults = JSON.parse(sessionStorage.getItem('topsisResults') || '[]');
    this.wsmResults = JSON.parse(sessionStorage.getItem('wsmResults') || '[]');

    // Calculate the maximum value for each array
    this.maxAHP = Math.max(...this.ahpResults.map(result => result.ahpOcena), 0);
    this.maxPromethee = Math.max(...this.prometheeResults.map(result => result.prometheeOcena), 0);
    this.maxTopsis = Math.max(...this.topsisResults.map(result => result.topsisOcena), 0);
    this.maxWSM = Math.max(...this.wsmResults.map(result => result.wsmOcena), 0);
  }

  checkArrays(): number {
    if (this.ahpResults.length == 0 && this.topsisResults.length == 0 && this.prometheeResults.length == 0 && this.wsmResults.length == 0){
      return 0;
    } else {
      return 1;
    }
  }

}
