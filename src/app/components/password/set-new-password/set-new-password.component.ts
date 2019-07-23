import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent implements OnInit {

  public errors = {
    password: null,
    message: null
  };

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    reset_token: null
  };

  constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private snotify: SnotifyService,
      private router: Router
    ) {
    route.queryParams.subscribe(params => {
      this.form.reset_token = params['token'];
    });

    console.log('test');
  }

  ngOnInit() {
  }

  resetPassword() {
    this.userService.changePassword(this.form).subscribe(
      successResponseData => this.handleSuccessResponse(successResponseData),
      errorResponseData => this.handleErrorResponse(errorResponseData)
    );
  }

  handleSuccessResponse(responseData) {
    this.snotify.success('Your new password is set', 'Success', {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    });

    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 1000);
  }

  handleErrorResponse(responseData) {

    if (responseData.errors.password.length) {
      this.errors.password = responseData.errors.password;
      this.errors.message = responseData.data;
    } else {
      this.snotify.success(responseData.message, 'Error.', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }
}
