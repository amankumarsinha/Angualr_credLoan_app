import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}

  url: string = 'http://localhost:3000';
  msg: any;

  // Use "url" as path to db.json and complete the services

  getLogin(): Observable<any> {
    // return the Login arraylw
    let data = this.http.get(this.url + '/Login');
    return data;
  }

  getCard(id: any): Observable<any> {
    // Using the id get the appropriate card data from Cards array
    let data = this.http.get(this.url + '/Cards?id=' + id);
    return data;
  }

  addLoan(data: any): Observable<any> {
    // Add the data to Loans array
    console.log('insdie loan post', data);
    let dataValue = this.http.post(this.url + '/Loans', data);
    dataValue.subscribe((res) => console.log('status ', res));
    return of(dataValue);
  }

  getLoan(id: any): Observable<any> {
    // Using the id get the appropriate Loans data from Loans array
    let data = this.http.get(this.url + '/Loans?id=' + id);
    return data;
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
