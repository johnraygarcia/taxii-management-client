import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent implements OnInit {

  public error = [];

  public form = {
    email: null,
    password: null,
    password_confirmation: null,
    reset_token: null
  };

  constructor(
      private route: ActivatedRoute,
      private userService: UserService,
      private snotify: SnotifyService
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
  }

  handleErrorResponse(responseData) {
    this.snotify.success('Ooopps! Looks like there is a problem in our service. We will check this first.', 'Error.', {
      timeout: 2000,
      showProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true
    });
  }

}
