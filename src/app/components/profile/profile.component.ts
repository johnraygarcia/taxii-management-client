import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any;

  constructor(
      private authService: AuthService,
      private router: Router,
      private userService: UserService
    ) { }

  ngOnInit() {
    this.authService.authStatus.subscribe((loggedIn) => {
      if (!loggedIn) {
        this.router.navigateByUrl('\login');
      }
    });

    // this.userService.me().subscribe(user => {
    //   this.currentUser = user;
    // });
  }

}
