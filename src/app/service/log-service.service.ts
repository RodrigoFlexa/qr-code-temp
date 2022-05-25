import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../model/Appointment.model';
import { OperationResponse } from '../model/OperationResponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  baseUrl: string = environment.production + 'log/appointment';

  constructor(private http: HttpClient) {
  }

  public logAppointment(appointment: Appointment): Observable<OperationResponse> {
    return this.http.post<OperationResponse>(this.baseUrl, appointment);
  }

}
