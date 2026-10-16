import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemberEventModel } from '../models/MemberEventModel';


@Injectable({
  providedIn: 'root',
})
export class MemberEventService {
  constructor(private http: HttpClient) {}
  getALLEvents() {
    return this.http.get<MemberEventModel[]>('http://localhost:3000/membreEvents');
  }
}
