import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatchCompanyService {

  private _url = 'http://localhost:4000/api/company';

  constructor(private _http: HttpClient) { }

  patch(companyId: string, companyData: any): Observable<any> {
    return this._http.patch<any>(this._url + `/${companyId}`, companyData);
  }
}
