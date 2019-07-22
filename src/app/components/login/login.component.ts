import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userCredential: {
    email: string,
    password: string
  };

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {

    this.userCredential = {
      email: null,
      password: null
    };

    this.authService.getStatus().subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigateByUrl('/profile');
      }
    });
  }

  handleLogin() {
    this.userService.login(this.userCredential).subscribe((data) => {
      this.handleResponse(data);
    }, (error) => {
      console.log(error);
    });
  }

  handleResponse(loginResponse) {
    this.tokenService.handle(loginResponse.access_token);

    if (this.tokenService.isValid()) {
      this.authService.changeStatus(true);
    }
  }
}
