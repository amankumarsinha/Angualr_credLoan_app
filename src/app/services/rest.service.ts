import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}

  url: string = '/api/';
  msg: any;

  // Use "url" as path to db.json and complete the services

  getLogin(): Observable<any> {
    // return the Login array
    return of();
  }

  getCard(id: any): Observable<any> {
    // Using the id get the appropriate card data from Cards array
    return of();
  }

  addLoan(data: any): Observable<any> {
    // Add the data to Loans array
    return of();
  }

  getLoan(id: any): Observable<any> {
    // Using the id get the appropriate Loans data from Loans array
    return of();
  }

  updateCards(data: any): Observable<any> {
    // Update the data in Cards array
    return of();
  }

  updateLoan(data: any): Observable<any> {
    // Update the data in Loans array
    return of();
  }

  getMsg(): any {
    // return data msg variable
    return of();
  }

  setMsg(data: any): any {
    // set the data to msg variable
  }
}
