import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { LoginComponent } from './login.component';

import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { HttpClient, HttpHandler } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { CardsData, LoginData } from 'src/dbData';
import { RestService } from '../../services/rest.service';
import { LoansComponent } from '../loans/loans.component';
import { routes } from '../../app-routing.module';

// <!Created to mock the service!>
export class MockRestService {
  Msg: any;
  getLogin(): Observable<any> {
    return of(LoginData);
  }

  getCard(id: any) {
    if (id == 4027106782381001) {
      return of(CardsData[0]);
    } else if (id == 4027106782381003) {
      return of(CardsData[3]);
    } else {
      return of(CardsData[3]);
    }
  }

  setMsg(data: any) {
    this.Msg = data;
  }

  getMsg(data: any) {
    return of(4027106782381003);
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let rs: RestService;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent, LoansComponent],

      providers: [
        { provide: RestService, useClass: MockRestService },
        HttpClient,
        HttpHandler,
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
      ],
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(LoginComponent);
    router.initialNavigation();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    rs = TestBed.inject(RestService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.detectChanges();
  });

  it('Should Contain specific data', () => {
    expect(component.loginData).toBe(LoginData);
  });

  it('Form validation check (phone) ', fakeAsync(() => {
    let control = component.loginForm.get('phone');

    control.setValue('');
    expect(control.valid).toBeFalsy();

    control.setValue(1223);
    expect(control.valid).toBeFalsy();

    control.setValue(12345678902245);
    expect(control.valid).toBeFalsy();

    control.setValue(1234567890);
    expect(control.valid).toBeFalsy();

    control.setValue(9876543210);
    expect(control.valid).toBeTrue();
  }));

  it('Form validation check (card) ', fakeAsync(() => {
    let control = component.loginForm.get('card');

    control.setValue('');
    expect(control.valid).toBeFalsy();

    control.setValue(999);
    expect(control.valid).toBeFalsy();

    control.setValue(1001111);
    expect(control.valid).toBeFalsy();

    control.setValue(1000);
    expect(control.valid).toBeTruthy();
  }));

  it('Form validation check (otp) ', fakeAsync(() => {
    let control = component.loginForm.get('card');

    control.setValue('');
    expect(control.valid).toBeFalsy();

    control.setValue(999);
    expect(control.valid).toBeFalsy();

    control.setValue(1001111);
    expect(control.valid).toBeFalsy();

    control.setValue(1000);
    expect(control.valid).toBeTruthy();
  }));

  it('Button disable check (Next)', fakeAsync(() => {
    let card = component.loginForm.get('card');
    let phone = component.loginForm.get('phone');

    fixture.detectChanges();
    tick();
    let button: HTMLButtonElement = fixture.nativeElement.querySelector('.nxt');
    fixture.detectChanges();
    expect(button.disabled).toBeTrue();

    card.setValue(1001);
    phone.setValue(9876543210);
    fixture.detectChanges();
    tick();
    expect(button.disabled).toBeFalse();

    card.setValue(100);
    phone.setValue(9876543210);
    fixture.detectChanges();
    tick();
    expect(button.disabled).toBeTrue();
  }));

  it('Checking next() valid credentials', fakeAsync(() => {
    let card = component.loginForm.get('card');
    let phone = component.loginForm.get('phone');

    let button: HTMLButtonElement = fixture.nativeElement.querySelector('.nxt');

    spyOn(component, 'next').and.callThrough();
    spyOn(rs, 'getCard').and.callThrough();
    const spyAlert = spyOn(window, 'alert').and.callThrough();

    tick();
    card.setValue(1001);
    phone.setValue(9876543210);
    fixture.detectChanges();
    button.click();

    fixture.detectChanges();
    expect(component.next).toHaveBeenCalled();
    expect(rs.getCard).toHaveBeenCalledWith(LoginData[0].card);
    expect(spyAlert).toHaveBeenCalledWith('The OTP is :' + component.otp);
  }));

  it('Checking next() invalid credentials', fakeAsync(() => {
    let card = component.loginForm.get('card');
    let phone = component.loginForm.get('phone');

    let button: HTMLButtonElement = fixture.nativeElement.querySelector('.nxt');

    spyOn(component, 'next').and.callThrough();
    spyOn(rs, 'getCard').and.callThrough();
    const spyAlert = spyOn(window, 'alert').and.callThrough();

    tick();
    card.setValue(1031);
    phone.setValue(9876543212);
    fixture.detectChanges();
    button.click();

    fixture.detectChanges();
    expect(component.next).toHaveBeenCalled();
    expect(rs.getCard).not.toHaveBeenCalledWith(LoginData[0].card);
    expect(spyAlert).toHaveBeenCalledWith('Invalid Credentials');
  }));

  it('Checking login() invalid otp', fakeAsync(() => {
    let card = component.loginForm.get('card');
    let phone = component.loginForm.get('phone');
    let otp = component.loginForm.get('otp');

    let button: HTMLButtonElement = fixture.nativeElement.querySelector('.nxt');
    const spyAlert = spyOn(window, 'alert').and.callThrough();

    tick();
    card.setValue(1001);
    phone.setValue(9876543210);
    fixture.detectChanges();
    button.click();

    fixture.detectChanges();
    expect(spyAlert).toHaveBeenCalledWith('The OTP is :' + component.otp);
    fixture.detectChanges();
    component.login();
    expect(spyAlert).toHaveBeenCalledWith('Wrong OTP !');
  }));

  it('Checking login() valid otp routing to Profile', fakeAsync(() => {
    let card = component.loginForm.get('card');
    let phone = component.loginForm.get('phone');
    let otp = component.loginForm.get('otp');

    let button: HTMLButtonElement = fixture.nativeElement.querySelector('.nxt');

    spyOn(rs, 'setMsg').and.callThrough();
    const spyAlert = spyOn(window, 'alert').and.callThrough();

    tick();
    card.setValue(1001);
    phone.setValue(9876543210);
    component.cardData = CardsData[0];
    fixture.detectChanges();
    button.click();
    component.cardData = CardsData[0];
    fixture.detectChanges();
    expect(spyAlert).toHaveBeenCalledWith('The OTP is :' + component.otp);
    otp.setValue(component.otp);

    fixture.detectChanges();
    component.login();
    tick();
    expect(rs.setMsg).toHaveBeenCalledWith(LoginData[0].card);
    expect(location.path()).toBe('/Profile');
  }));

  it('Checking login() valid otp routing to Loans', fakeAsync(() => {
    let card = component.loginForm.get('card');
    let phone = component.loginForm.get('phone');
    let otp = component.loginForm.get('otp');

    let button: HTMLButtonElement = fixture.nativeElement.querySelector('.nxt');

    spyOn(rs, 'setMsg').and.callThrough();
    const spyAlert = spyOn(window, 'alert').and.callThrough();

    tick();
    card.setValue(1004);
    phone.setValue(8757656201);
    fixture.detectChanges();
    button.click();
    component.cardData = CardsData[3];
    fixture.detectChanges();
    expect(spyAlert).toHaveBeenCalledWith('The OTP is :' + component.otp);
    otp.setValue(component.otp);

    fixture.detectChanges();
    component.login();
    tick();
    expect(location.path()).toBe('/Loans');
  }));
});
