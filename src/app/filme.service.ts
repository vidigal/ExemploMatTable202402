import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { IFilmeTrendingResponse } from './tabela/tabela.component';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  constructor(private http: HttpClient) { }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+environment.apiKey
      })
    };
  }

  listarFilmesTrending(): Observable<IFilmeTrendingResponse> {
    //let url = environment.api_url+"trending/movie/day?language=pt-BR&page=1";
    let url = environment.api_url+"movie/popular?language=pt-BR";
    const options = this.getHeaders();

    return this.http.get<IFilmeTrendingResponse>(url, options);
  }

}
