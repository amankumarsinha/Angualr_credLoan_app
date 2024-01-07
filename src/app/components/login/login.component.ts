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

  constructor() {}

  ngOnInit(): void {
    // Obtain the Login array from db.json using service and store it in this.loginData

    this.loginForm = new FormGroup({
      // Create the form elements with following validations
      // phone : Required, should be a 10 digit number starts with 6,7,8 or 9
      // card  : Required, should be a 4 digit number
      // otp   : Required, should be a random number from 100 to 99999
    });
  }

  next() {
    // Call this function when button "Next" is clicked
    // Used to validate credentials and generate otp
    // If the credentials are present in array generate the otp and show the otp field hiding other form elements
    // Generate an otp from 100 to 99999 and store it in this.otp
    // Also obtain the card data of the user from the Cards array using appropriate service
    // If the credentials are not present show an alert message ""Invalid Credentials""
  }

  login() {
    // Call this function when "Login" button is clicked
    // take the carddata  of the user and check if the user has a loan or not (check "loan_status" in Cards )
    // If loan_status is true navigate to "Profile Component" else navigate to "Loans Component"
    // Also pass the card id to the specific component
    // If the otp is false show an alert "Wrong OTP !" then hide the OTP field and show phone number and card digits fields
  }
}
