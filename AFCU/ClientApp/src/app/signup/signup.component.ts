import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigurationService, UserService } from '../services';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private user: User = new User();

  private existingUsername: boolean = false;
  private usernameValid: boolean = true;
  private passwordValid: boolean = true;
  private phoneNumberValid: boolean = true;

  constructor(private configurationService: ConfigurationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.user.id = '';
  }

  signup() {
    console.log(`${this.usernameValid}, ${this.passwordValid}, ${this.phoneNumberValid}`);

    this.validate();

    console.log(`${this.usernameValid}, ${this.passwordValid}, ${this.phoneNumberValid}`);

    if (this.usernameValid === true && this.existingUsername === false && this.passwordValid === true && this.phoneNumberValid === true) {
      this.userService.saveUser(this.user as User).subscribe(data => {
        this.user = new User(data);

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
    this.checkPhoneNumber();
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
        const existingUser = new User(data);

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

  checkPhoneNumber(): void {
    this.checkEmptyPhoneNumber();
    this.checkPhoneNumberFormat();
  }

  checkEmptyPhoneNumber(): void {
    if (!this.user.phoneNumber && this.phoneNumberValid) {
      this.phoneNumberValid = false;
    }
    else {
      this.phoneNumberValid = true;
    }
  }

  checkPhoneNumberFormat(): void {
    if (this.phoneNumberValid && this.user.phoneNumber.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
      this.phoneNumberValid = true;
    }
    else {
      this.phoneNumberValid = false;
    }
  }
}
