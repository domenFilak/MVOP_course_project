import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PythonScriptsService {

  private _url_topsis = 'http://localhost:5000/calculate_topsis';
  private _url_wsm = 'http://localhost:5000/calculate_wsm';

  constructor(private _http: HttpClient) { }

  postTopsis(data: any): Observable<any> {
    return this._http.post<any>(this._url_topsis, data);
  }

  postWsm(data: any): Observable<any> {
    return this._http.post<any>(this._url_wsm, data);
  }

}
