import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';
import { User } from 'src/app/models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  registrationErrors: string[] = [];
  user = new User();

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {}

  onSubmit(event: Event, formUser: User): void {
    console.log('submitting registration data');
    event.preventDefault();
    this.auth.register(formUser).subscribe(userFromAPI => {
      console.log(userFromAPI);

      this.router.navigateByUrl('books');
    });
  }
}
