import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private apiUrl: string = 'https://localhost:5001/api';

  constructor() { }

  getAPIUrl(): string {
    return this.apiUrl;
  }
}
