import { Component, OnInit } from '@angular/core';
import { UserService, ConfigurationService } from '../services';
import { User } from '../models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  validUser: boolean = true;
  attempts: number = 0;


  constructor(private configurationService: ConfigurationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    if (this.user.username !== null && this.user.password !== null) {
      this.userService.getUser(this.user).subscribe((user) => {
        if (user == null || user.id == null) {
          this.validUser = false;
          this.attempts++;
          this.user = new User();
        }
        else {
          this.attempts = 0;
          this.validUser = true;

          this.router.navigateByUrl(`/landing/${user.id}`);
        }
      });
    }
    else {
      this.validUser = false;
      this.attempts++;
    }
  }

  signup() {
    this.router.navigateByUrl(`/signup`);
  }
}
