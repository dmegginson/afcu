import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { UserService, ConfigurationService } from '../services';
import { User } from '../models';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  user: User = null;
     
  constructor(private configurationService: ConfigurationService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.user = this.route.snapshot.data['currentUser'];

    if (this.user === null) {
      const id = this.route.snapshot.paramMap.get('id');

      if (id === null) {
        this.router.navigateByUrl('/');
      }

      this.userService.getUserById(id).subscribe(data => {
        this.user = new User(data);
      });

      if (this.user === null) {
        this.router.navigateByUrl(this.configurationService.getAPIUrl());
      }
    }
  }

  logout() {
    this.user.lastLoggedIn = new Date();
    this.userService.updateUser(this.user).subscribe((user) => {
      this.user = null;
      this.router.navigateByUrl('/');
    });
  }
}
