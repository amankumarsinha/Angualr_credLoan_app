import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loanData: any;

  loanForm: any;

  showLoan = true;

  constructor() {}

  ngOnInit(): void {
    // Obtain the loan id/card id from the previous component and get the user's credit limit and loan details using appropriate services
    // Store the loan details in this. loanData

    this.loanForm = new FormGroup({
      amount: new FormControl(null, [Validators.required]),
    });
  }

  upgrade() {
    // Hide the table and show the form to upgrade the loan
  }

  view() {
    // obtain new amount  from the form and calculate :
    // new final amount  = old final amount + ( new amount + (new amount *6 ) * (duration in years) )
    // emi = final amount / duration in months (round off using ceiling function)
    // display this data in appropriate positions in the loan table and hide the form
    // also hide the Upgade button in the table and dispaly "Close" and "Proceed" button
  }

  cancel() {
    // reset the form and show the intial data displayed
  }

  proceed() {
    // Use the appropriate service and update the Loan data of the user
    // principal amount, final amount and emi should be updated
    // and give an alert message "Loan updated !"
  }
}
