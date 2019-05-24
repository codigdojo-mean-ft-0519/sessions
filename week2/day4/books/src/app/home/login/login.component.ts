import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services';
import { User } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginErrors: string[] = [];
  user = new User();

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  onSubmit(event: Event, userFromForm: User) {
    event.preventDefault();
    console.log('logging in', userFromForm);

    this.auth.login(userFromForm).subscribe(userFromAPI => {
      console.log(userFromAPI);

      this.router.navigateByUrl('books');
    });
  }
}
