import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PythonScriptsService {

  private _url_topsis = 'http://localhost:5000/calculate_topsis';
  private _url_wsm = 'http://localhost:5000/calculate_wsm';
  private _url_promethee = 'http://localhost:5000/calculate_promethee';
  private _url_ahp = 'http://localhost:5000/calculate_ahp';

  constructor(private _http: HttpClient) { }

  postTopsis(data: any): Observable<any> {
    return this._http.post<any>(this._url_topsis, data);
  }

  postWsm(data: any): Observable<any> {
    return this._http.post<any>(this._url_wsm, data);
  }

  postPromethee(data: any): Observable<any> {
    return this._http.post<any>(this._url_promethee, data);
  }

  postAhp(data: any): Observable<any> {
    return this._http.post<any>(this._url_ahp, data);
  }

}
