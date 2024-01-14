import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../../app-routing.module';
import { ProfileComponent } from './profile.component';
import { RestService } from '../../services/rest.service';
import { Location } from '@angular/common';
import { CardsData, LoansData, LoginData } from 'src/dbData';
import { Observable, of } from 'rxjs';

// <!Created to mock the service!>
export class MockRestService {
  Msg: any;
  getLogin(): Observable<any> {
    return of(LoginData);
  }

  getLoan(id: any): Observable<any> {
    return of(LoansData[1]);
  }

  getCard(id: any) {
    return of(CardsData[1]);
  }

  setMsg(data: any) {
    this.Msg = data;
  }

  getMsg(data: any) {
    return of(4027106782381003);
  }

  addLoan(data: any) {
    return of(null);
  }

  updateCards(data: any) {
    return of(null);
  }
  updateLoan(data: any) {
    return of(null);
  }
}

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let rs: RestService;
  let location: Location;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],

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
    fixture = TestBed.createComponent(ProfileComponent);
    router.initialNavigation();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    rs = TestBed.inject(RestService);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    component.ngOnInit();
  });

  afterEach(() => {
    component.loanData = LoansData[1];
  });

  it('Checking proceed()  ', fakeAsync(() => {
    component.loanData = LoansData[2];
    let amount = component.loanForm.get('amount');

    spyOn(rs, 'updateLoan').and.callThrough();
    const spyAlert = spyOn(window, 'alert').and.callThrough();

    amount.setValue(20000);
    fixture.detectChanges();
    tick();
    component.view();
    fixture.detectChanges();
    tick();

    component.proceed();
    tick();
    fixture.detectChanges();
    expect(rs.updateLoan).toHaveBeenCalledWith(
      Object({
        id: '4027106782381005',
        name: 'Mike Ross',
        principal: 40000,
        finalAmount: 42400,
        duration: '12',
        emi: 3534,
      })
    );
    expect(spyAlert).toHaveBeenCalledWith('Loan updated !');
    let title: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(title.innerHTML).toBe(
      'Hi Mike Ross, You have due of 42400 Rs and you can upgrade the loan upto 57600 Rs'
    );
  }));

  it('Initial rendering (welcome msg, form hidden, table visible', () => {
    let title: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(title.innerHTML).toBe(
      'Hi John Snow, You have due of 21200 Rs and you can upgrade the loan upto 78800 Rs'
    );

    let form: HTMLElement = fixture.nativeElement.querySelector('form');
    expect(form).toBeNull();

    let table: HTMLElement = fixture.nativeElement.querySelector('table');
    expect(table.hidden).toBeFalse();
  });

  it('Checking initial table data (loan upgradable) ', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    let table: HTMLElement = fixture.nativeElement.querySelector(
      'table > tr:nth-child(2)'
    );
    expect(table.innerText).toContain('20000 Rs');
    table = fixture.nativeElement.querySelector('table > tr:nth-child(4)');
    expect(table.innerText).toContain('21200 Rs');
    table = fixture.nativeElement.querySelector('table > tr:nth-child(6)');
    expect(table.innerText).toContain('1767 Rs');

    let Button = fixture.nativeElement.querySelector('#upgrade');
    expect(Button).not.toBeNull();
  }));

  it('Checking upgrade() button', fakeAsync(() => {
    fixture.nativeElement.querySelector('#upgrade').click();
    component.upgrade();
    tick();
    fixture.detectChanges();
    fixture.detectChanges();
    tick();
    let table: HTMLElement = fixture.nativeElement.querySelector('table');
    let form: HTMLElement = fixture.nativeElement.querySelector('form');
    expect(table).toBeNull();
    expect(form).not.toBeNull();
  }));

  it('Loan form button disable check', fakeAsync(() => {
    fixture.nativeElement.querySelector('#upgrade').click();
    component.upgrade();
    tick();
    fixture.detectChanges();
    fixture.detectChanges();
    tick();

    let control = component.loanForm.get('amount');
    let button: HTMLButtonElement = fixture.nativeElement.querySelector('.btn');

    control.setValue('');
    expect(button.disabled).toBeTrue();

    control.setValue(100000);
    expect(button.disabled).toBeTrue();
  }));

  it('Checking view() ', fakeAsync(() => {
    let amount = component.loanForm.get('amount');

    fixture.detectChanges();
    tick();

    amount.setValue(20000);
    fixture.detectChanges();
    tick();
    component.view();
    fixture.detectChanges();
    tick();

    let form = fixture.nativeElement.querySelector('form');
    expect(form).toBeNull();

    let table: HTMLElement = fixture.nativeElement.querySelector(
      'table > tr:nth-child(2)'
    );
    expect(table.innerText).toContain('40000 Rs');
    table = fixture.nativeElement.querySelector('table > tr:nth-child(4)');
    expect(table.innerText).toContain('42400 Rs');
    table = fixture.nativeElement.querySelector('table > tr:nth-child(6)');
    expect(table.innerText).toContain('3534 Rs');
  }));

  it('Checking view() input 2', fakeAsync(() => {
    let amount = component.loanForm.get('amount');

    fixture.detectChanges();
    tick();

    amount.setValue(10000);
    fixture.detectChanges();
    tick();
    component.view();
    fixture.detectChanges();
    tick();

    let form = fixture.nativeElement.querySelector('form');
    expect(form).toBeNull();

    let table: HTMLElement = fixture.nativeElement.querySelector(
      'table > tr:nth-child(2)'
    );
    expect(table.innerText).toContain('30000 Rs');
    table = fixture.nativeElement.querySelector('table > tr:nth-child(4)');
    expect(table.innerText).toContain('31800 Rs');
    table = fixture.nativeElement.querySelector('table > tr:nth-child(6)');
    expect(table.innerText).toContain('2650 Rs');
  }));

  it('Checking cancel() ', fakeAsync(() => {
    let amount = component.loanForm.get('amount');

    fixture.detectChanges();
    tick();
    amount.setValue(20000);
    fixture.detectChanges();
    tick();
    component.view();
    fixture.detectChanges();
    tick();

    let form = fixture.nativeElement.querySelector('form');
    expect(form).toBeNull();

    component.cancel();
    fixture.detectChanges();
    let table: HTMLElement = fixture.nativeElement.querySelector(
      'table > tr:nth-child(2)'
    );
    expect(table.innerText).toContain('20000 Rs');
    table = fixture.nativeElement.querySelector('table > tr:nth-child(4)');
    expect(table.innerText).toContain('21200 Rs');
    table = fixture.nativeElement.querySelector('table > tr:nth-child(6)');
    expect(table.innerText).toContain('1767 Rs');
  }));
});
