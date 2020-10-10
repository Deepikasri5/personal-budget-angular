import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { D3Chart } from './D3Chart.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataStr : string = "http://localhost:3000/budget";
  constructor(private http: HttpClient) { }

getData(): Observable<D3Chart[]>{
  return this.http.get<D3Chart[]>(this.dataStr);
}
}
