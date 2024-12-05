import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddCompanyService {

  private _url = 'http://localhost:4000/api/company';

  constructor(private _http: HttpClient) { }

  add(companyData: any): Observable<any> {
    return this._http.post<any>(this._url, companyData);
  }


}
