import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RestService } from '../../services/rest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  loanData: any;

  loanForm: any;

  showLoan = true;
  cardId: string | null = '';
  creditLimit: number = 0;
  rem: number = 0;
  haveLoanLeft: boolean = false;
  newLoan: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restService: RestService
  ) {}

  async ngOnInit(): Promise<void> {
    // Obtain the loan id/card id from the previous component and get the user's credit limit and loan details using appropriate services
    // Store the loan details in this. loanData
    this.cardId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('crd id ', this.cardId);
    this.loanForm = new FormGroup({
      amount: new FormControl(null, [Validators.required]),
    });

    this.restService.getLoan(this.cardId).subscribe((card) => {
      console.log('loan data', card);
      this.loanData = card;
      console.log(' loadata ', this.loanData[0]);
      //this.creditLimit = this.loanData[0].creditLimit;
    });

    this.restService.getCard(this.cardId).subscribe((card) => {
      console.log('card data', card);
      this.creditLimit = parseInt(card[0].credit_limit);
      console.log(this.creditLimit, typeof this.creditLimit);
      console.log(
        this.loanData[0].finalAmount,
        typeof this.loanData[0].finalAmount
      );
      this.rem = this.creditLimit - parseInt(this.loanData[0].finalAmount);
      this.haveLoanLeft = this.rem > 0;
      console.log(this.rem, this.haveLoanLeft);
    });
  }

  upgrade() {
    // Hide the table and show the form to upgrade the loan
    this.showLoan = false;
    this.newLoan = true;
  }

  view() {
    // obtain new amount  from the form and calculate :
    // new final amount  = old final amount + ( new amount + (new amount *6 ) * (duration in years) )
    // emi = final amount / duration in months (round off using ceiling function)
    // display this data in appropriate positions in the loan table and hide the form
    // also hide the Upgade button in the table and dispaly "Close" and "Proceed" button
    // also hide the Upgade button in the table and dispaly "Close" and "Proceed" button
    let newAmount = parseInt(this.loanForm.get('amount').value);
    console.log(newAmount, typeof newAmount);
    console.log(this.loanData[0].principal, typeof this.loanData[0].principal);
    console.log(newAmount * 6, typeof (newAmount * 6));
    console.log(
      newAmount + (newAmount * 6) / (parseInt(this.loanData[0].duration) / 12),
      typeof (
        newAmount +
        (newAmount * 6) / (parseInt(this.loanData[0].duration) / 12)
      )
    );
    console.log(parseInt(this.loanData[0].duration));

    let newFinalAmount = parseInt(
      this.loanData[0].principal +
        (newAmount +
          (newAmount * 6) / (parseInt(this.loanData[0].duration) / 12))
    );
    console.log(newFinalAmount, typeof newFinalAmount);
    let newEmi = Math.ceil(
      newFinalAmount / parseInt(this.loanData[0].duration)
    );
    this.loanData[0].finalAmount = newFinalAmount;
    this.loanData[0].emi = newEmi;
    this.loanData[0].principal = newAmount;
    this.showLoan = true;
    console.log(document.getElementById('upgrade'));
  }

  cancel() {
    // reset the form and show the intial data displayed
  }

  proceed() {
    this.restService.addLoan(this.loanData[0]);
    // Use the appropriate service and update the Loan data of the user
    // principal amount, final amount and emi should be updated
    // and give an alert message "Loan updated !"
  }
}
