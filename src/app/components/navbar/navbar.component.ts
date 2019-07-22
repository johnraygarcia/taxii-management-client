import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loginStatus: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.authService.getStatus().subscribe(loginStatus => {
      this.loginStatus = loginStatus;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
