import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { User } from '../models';
import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly endpoint: string = 'user';

  private readonly headers = {    
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8;'
    })
  };

  constructor(private configurationService: ConfigurationService,
    private http: HttpClient) {
  }

  saveUser(user: User): Observable<User> {
    const url = `${this.configurationService.getAPIUrl()}/${this.endpoint}`;

    user.id = '00000000-0000-0000-0000-000000000000';

    console.log(JSON.stringify(user));

    return this.http.post<User>(url, JSON.stringify(user), this.headers).pipe(
      map((data => new User(data)), share()));
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.configurationService.getAPIUrl()}/${this.endpoint}/${user.id}`;

    return this.http.put<User>(url, JSON.stringify(user), this.headers).pipe(
      map((data => new User(data)), share()));
  }

  getUser(user: User): Observable<User> {
    const url = `${this.configurationService.getAPIUrl()}/${this.endpoint}/${user.username}/${user.password}`;

    return this.http.get<User>(url).pipe(
      map((data => new User(data)), share()));
  }

  getUserById(id: string): Observable<User> {
    const url = `${this.configurationService.getAPIUrl()}/${this.endpoint}/${id}`;

    return this.http.get<User>(url).pipe(
      map((data => new User(data)), share()));
  }

  getUserByUsername(username: string): Observable<User> {
    const url = `${this.configurationService.getAPIUrl()}/${this.endpoint}/username/${username}`;

    return this.http.get<User>(url).pipe(
      map((data => new User(data)), share()));
  }
}
