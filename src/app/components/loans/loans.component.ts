import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css'],
})
export class LoansComponent implements OnInit {
  card: any;
  cardData: any;
  loanForm: any;

  constructor() {}

  ngOnInit(): void {
    // Obtain card id from login component and store it in this.card
    // get the respective card data from Cards array in db.json using services and use it appropriately in the template file

    this.loanForm = new FormGroup({
      // Create the form elements with following validations
      // amount : Required, minimum = 10000, maxium = credit limit of the user
      // duration  : Required
    });
  }

  view() {
    // obtain amount and duration from the form and calculate :
    // final amount  = amount + (amount *6 ) * (duration in years)
    // emi = final amount / duration in months (round off using ceiling function)
    // display this data in appropriate positions in the loan table and hide the form
  }

  proceed() {
    // data = {
    //   "id": card id
    //   "name": name of the card owner
    //   "principal" : loan amount taken
    //   "finalAmount": amount to be repaid with interest
    //   "duration" : duration of the loan
    //   "emi" : monthly emi
    // }
    // Create the above loan data object and add it to the Loans array in db.json using the appropriate service
    // use the proper service and update the card data of the user by setting loan_status = true
    // Show an alert message "Loan approved", pass the card id to the Profile component and navigate there
  }

  close() {
    //  Hide the table and display the form
  }
}
