import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  amount: number = 0;
  finalAmount: number = 0;
  emi: number = 0;
  showTable: boolean = true;
  duration: string = '';
  name: string = '';
  creditLimit: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private restService: RestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtain card id from login component and store it in this.card
    // get the respective card data from Cards array in db.json using services and use it appropriately in the template file
    this.card = this.activatedRoute.snapshot.paramMap.get('id');
    let data = this.restService.getCard(this.card);

    data.subscribe((getData) => {
      this.cardData = getData;
      console.log('card data ', this.cardData);
      this.name = this.cardData[0].name;
      this.creditLimit = this.cardData[0].credit_limit;
    });

    this.loanForm = new FormGroup({
      // Create the form elements with following validations
      // this.amount : Required, minimum = 10000, maxium = credit limit of the user
      amount: new FormControl(null, [
        Validators.required,
        Validators.min(10000),
        Validators.max(100000),
      ]),
      // duration  : Required
      duration: new FormControl(null, Validators.required),
    });
  }

  view() {
    // obtain this.amount and duration from the form and calculate :
    // final this.amount  = this.amount + (this.amount *6 ) * (duration in years)
    // emi = final this.amount / duration in months (round off using ceiling function)
    // display this data in appropriate positions in the loan table and hide the form
    this.duration = this.loanForm.get('duration').value;
    this.amount = parseInt(this.loanForm.get('amount').value);
    this.finalAmount =
      this.amount +
      this.amount * 6 * (parseInt(this.loanForm.get('duration').value) / 12);
    this.emi = Math.ceil(
      this.finalAmount / parseInt(this.loanForm.get('duration').value)
    );
    this.showTable = false;
    console.log(this.showTable);
  }

  proceed() {
    // data = {
    //   "id": card id
    //   "name": name of the card owner
    //   "principal" : loan this.amount taken
    //   "finalAmount": this.amount to be repaid with interest
    //   "duration" : duration of the loan
    //   "emi" : monthly emi
    // }
    // Create the above loan data object and add it to the Loans array in db.json using the appropriate service
    // use the proper service and update the card data of the user by setting loan_status = true
    // Show an alert message "Loan approved", pass the card id to the Profile component and navigate there
    let data = {
      id: '' + this.cardData[0].id,
      name: this.cardData[0].name,
      principal: this.amount,
      finalAmount: this.finalAmount,
      duration: this.duration,
      emi: this.emi,
    };
    console.log('new data', data);
    this.restService.addLoan(data);
    window.alert('Loan Approved');
    this.router.navigateByUrl('/Profile/' + this.cardData[0].id);
  }

  close() {
    //  Hide the table and display the form
    this.showTable = true;
  }
}
