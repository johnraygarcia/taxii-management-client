import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.scss']
})
export class RequestPasswordResetComponent implements OnInit {

  public form = {
    email: null
  };

  error: {
    message: null
  };

  constructor(
    private userService: UserService,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit() {
    this.error = null;
  }

  handleSubmit(): void {
    this.userService.sendPasswordResetLink(this.form).subscribe(response => {

      this.clearError();
      this.snotifyService.success('Please check your email for the password reset link.', 'Email sent', {
        timeout: 2000,
        showProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true
      });
    }, error => this.handleError(error));

  }

  handleError(error) {

    this.error = {
      message: error.error.data
    }
  }

  clearError() {
    this.error = null;
  }
}
