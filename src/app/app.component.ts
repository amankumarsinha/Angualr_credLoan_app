import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'credLoans';

  constructor(private router: Router, private rs: RestService) {}

  toLogin() {
    this.rs.msg = null;
    this.router.navigateByUrl('/Login');
  }
}
