import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../model/User.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private readonly http: HttpClient) { }


  getCandidatesList(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>('/mock/candidatesList.json');
  }
}
