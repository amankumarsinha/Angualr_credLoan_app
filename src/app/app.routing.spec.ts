import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestService } from './services/rest.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { LoansComponent } from './components/loans/loans.component';
import { ProfileComponent } from './components/profile/profile.component';

describe(' Routing Test', () => {
  let location: Location;
  let router: Router;
  let fixture;
  let restService: RestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [
        AppComponent,
        LoginComponent,
        LoansComponent,
        ProfileComponent,
      ],
      providers: [HttpClient, HttpHandler],
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
    restService = TestBed.inject(RestService);
  });

  it('Should navigate to Starting page (Login)', fakeAsync(() => {
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/Login');
  }));

  it('Should navigate to Login Component', fakeAsync(() => {
    router.navigate(['Login']);
    tick();
    expect(location.path()).toBe('/Login');
  }));

  it('Should navigate to Loans Component', fakeAsync(() => {
    router.navigate(['Loans']);
    tick();
    expect(location.path()).toBe('/Loans');
  }));

  it('Should navigate to Profile Component', fakeAsync(() => {
    router.navigate(['Profile']);
    tick();
    expect(location.path()).toBe('/Profile');
  }));

  it('Should navigate to default Component (Login)', fakeAsync(() => {
    router.navigate(['**']);
    tick();
    expect(location.path()).toBe('/Login');
  }));
});
