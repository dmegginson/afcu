import { Component, OnInit } from '@angular/core';
import { NewUser, User } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService, UserService } from '../services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private user: NewUser = new NewUser();

  private existingUsername: boolean = false;
  private usernameValid: boolean = true;
  private passwordValid: boolean = true;

  constructor(private configurationService: ConfigurationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.user.id = '';
  }

  signup() {
    this.validate();

    if (this.usernameValid === true && this.existingUsername === false && this.passwordValid === true) {
      this.userService.saveUser(this.user as User).subscribe(data => {
        this.user = new NewUser(data);

        this.router.navigateByUrl(`/landing/${this.user.id}`);
      });
    }
  }

  login() {
    let url: string = this.router.url;
    console.log(url);
    this.router.navigateByUrl(`/`);
  }

  validate(): void {
    this.checkUsername();
    this.checkEmptyPassword();
  }

  checkUsername(): void {
    this.checkEmptyUsername();
    this.checkExistingUsername();
  }

  checkEmptyUsername(): void {
    if (!this.user.username && this.usernameValid) {
      this.usernameValid = false;
    }
    else {
      this.usernameValid = true;
    }
  }

  checkExistingUsername(): void {
    if (this.usernameValid) {
      this.userService.getUserByUsername(this.user.username).subscribe(data => {
        const existingUser = new NewUser(data);

        if (existingUser.username != null) {
          this.existingUsername = true;
          this.user.username = '';
        }
        else {
          this.existingUsername = false;
        }
      });
    }
  }

  checkEmptyPassword(): void {
    if (!this.user.password && this.passwordValid) {
      this.passwordValid = false;
    }
    else {
      this.passwordValid = true;
    }
  }
}
