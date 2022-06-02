
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { qrCode } from './qrCode';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class QrCodeService {
  saidaUrl:any;

    constructor(private http: HttpClient) {}
    // Http Headers


  
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type'
      }), 
    };
    
    liberaCatraca(nrCont: string , idQr: string): Observable<qrCode> {
      this.saidaUrl  = nrCont + idQr; 
     return this.http.get<any>(this.saidaUrl);
    }

    // GET
    GetQrData(id: string): Observable<qrCode> {
      id = 'getDados=' + id;
      return this.http.get<qrCode>(`https://testecodbarras.juuzou123.repl.co/${id}`);
    }

    Pagar(id: string): Observable<qrCode> {
      return this.http.get<any>(`https://TesteCodBarras.juuzou123.repl.co/pagamento=`+ id);
    //this.getteste();
  }
    

    // Error handling
    errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(() => {
          return errorMessage;
        });
    }
}