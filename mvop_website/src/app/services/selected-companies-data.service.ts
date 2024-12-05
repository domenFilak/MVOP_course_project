import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedCompaniesDataService {

  private companiesSource = new BehaviorSubject<any[]>([]);
  currentCompanies = this.companiesSource.asObservable();

  constructor() { }

  changeCompanies(companies: any[]) {
    this.companiesSource.next(companies);
  }
  
}
