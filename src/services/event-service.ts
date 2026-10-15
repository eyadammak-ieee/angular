import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventModel } from '../models/EventModel';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}
  getALLEvents() {
    return this.http.get<EventModel[]>('http://localhost:3000/events');
  }
}
