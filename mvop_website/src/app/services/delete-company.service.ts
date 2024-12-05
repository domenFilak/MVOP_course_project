import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteCompanyService {

  private _url = 'http://localhost:4000/api/company';

  constructor(private _http: HttpClient) { }

  deleteCompany(id: string): Observable<any> {
    return this._http.delete(`${this._url}/${id}`);
  }
}
