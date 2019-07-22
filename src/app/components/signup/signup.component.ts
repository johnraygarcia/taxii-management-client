import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  userDetail: User;

  error: {
    name: string,
    email: string,
    password: string
  };

  constructor(
    private userService: UserService,
    private tokenService: TokenService) { }

  ngOnInit() {
    this.userDetail = new User(null, null, null, null);
    this.error = {
      ...this.userDetail
    };
  }

  handleSignup(): void {
    this.userService.signup(this.userDetail).subscribe(data => {

      // save login details to local storage
      const token = data.access_token;
      localStorage.setItem('token', token);
      this.tokenService.handle(token);

    }, errorResponse => {
      Object.keys(errorResponse.error.errors).forEach(key => {
        this.error[key] = errorResponse.error.errors[key][0];
      });
    });
  }
}
