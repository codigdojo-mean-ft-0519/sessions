import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isAuthed = false;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    console.log(this.auth.isAuthed());
    this.auth.isAuthed$.subscribe(authed => {
      console.log('are we aauthed?', authed);
      this.isAuthed = authed;
    });
  }

  logout() {
    console.log('logging out');
    this.auth.logout().subscribe(() => {
      console.log('logged out!!!!');

      this.router.navigateByUrl('/');
    });
  }
}
