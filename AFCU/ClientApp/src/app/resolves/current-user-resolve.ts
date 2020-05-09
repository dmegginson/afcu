import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';
import { User } from "../models";
import { UserService } from "../services";


@Injectable()
export class CurrentUserResolve implements Resolve<User> {

  constructor(private userService: UserService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const id = route.paramMap.get('id');
    return this.userService.getUserById(id);
  }
}