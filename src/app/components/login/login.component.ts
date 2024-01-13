import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  loginData: any;
  otp: any;
  cardData: any;
  id: string = '';

  constructor(private restSevice: RestService, private router: Router) {}

  ngOnInit(): void {
    // Obtain the Login array from db.json using service and store it in this.loginData

    this.loginForm = new FormGroup({
      // Create the form elements with following validations
      // phone : Required, should be a 10 digit number starts with 6,7,8 or 9
      phone: new FormControl(null, Validators.pattern('((6|7|9|8)\\d{9})$')),
      card: new FormControl(null, Validators.pattern('([0-9]\\d{3})$')),
      otp: new FormControl(
        null,
        Validators.pattern('\b(1\\d{2}|[2-9]\\d{2}|[1-9]\\d{3})\b')
      ),
      // card  : Required, should be a 4 digit number
      // otp   : Required, should be a random number from 100 to 99999
    });

    console.log('form ', this.loginForm);
  }

  next() {
    console.log('in next ', this.loginForm);

    let dataValue: Array<any> = [];
    let flag = false;

    this.restSevice.getLogin().subscribe((data) => {
      console.log('in data ', data);
      data.forEach((element: { phone: any; card: string; id: string }) => {
        console.log();
        if (
          element.phone == this.loginForm.get('phone').value &&
          element.card.slice(-4) == this.loginForm.get('card').value
        ) {
          flag = true;
          this.id = element.card;
        }
      });
      if (flag) {
        this.otp = Math.floor(Math.random() * (99999 - 100) + 100);
        window.alert('OTP =' + this.otp);
      } else {
        window.alert('Invalid Credentials');
      }
    });
    // Call this function when button "Next" is clicked
    // Used to validate credentials and generate otp
    // If the credentials are present in array generate the otp and show the otp field hiding other form elements
    // Generate an otp from 100 to 99999 and store it in this.otp
    // Also obtain the card data of the user from the Cards array using appropriate service
    // If the credentials are not present show an alert message ""Invalid Credentials""
  }

  login() {
    if (this.otp == this.loginForm.get('otp').value) {
      let data = this.restSevice.getCard(this.id);

      data.subscribe((getData) => {
        this.cardData = getData;
        console.log('card data ', this.cardData);
        if (this.cardData[0].loan_status) {
          this.router.navigateByUrl('/Profile/' + this.id);
        } else {
          this.router.navigateByUrl('/Loans');
        }
      });
    } else {
      window.alert('Wrong OTP!');
    }
    // Call this function when "Login" button is clicked
    // take the carddata  of the user and check if the user has a loan or not (check "loan_status" in Cards )
    // If loan_status is true navigate to "Profile Component" else navigate to "Loans Component"
    // Also pass the card id to the specific component
    // If the otp is false show an alert "Wrong OTP !" then hide the OTP field and show phone number and card digits fields
    //this.restSevice.getLogin().subscribe((data) => console.log(data));
  }
}
