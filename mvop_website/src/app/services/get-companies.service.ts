import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCompaniesService {

  private _url = 'http://localhost:4000/api/company';

  constructor(private _http: HttpClient) { }

  get(): Observable<any> {
    return this._http.get<any>(this._url);
  }

  getCompany(companyId: string): Observable<any> {
    return this._http.get<any>(this._url + `/${companyId}`);
  }
}
