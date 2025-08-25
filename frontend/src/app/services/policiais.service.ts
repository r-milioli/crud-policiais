import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Policial {
  id?: number;
  rg_civil: string;
  rg_militar: string;
  cpf: string;
  data_nascimento: string;
  matricula: string;
}

@Injectable({
  providedIn: 'root'
})
export class PoliciaisService {
  private apiUrl = 'http://localhost:3008/policiais';

  constructor(private http: HttpClient) { }

  cadastrarPolicial(dados: Policial): Observable<any> {
    return this.http.post(this.apiUrl, dados);
  }

  listarPoliciais(): Observable<Policial[]> {
    return this.http.get<Policial[]>(this.apiUrl);
  }

  buscarPorCPF(cpf: string): Observable<Policial[]> {
    return this.http.get<Policial[]>(`${this.apiUrl}?cpf=${cpf}`);
  }

  buscarPorRG(rg: string): Observable<Policial[]> {
    return this.http.get<Policial[]>(`${this.apiUrl}?rg=${rg}`);
  }
}
