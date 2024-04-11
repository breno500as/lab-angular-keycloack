import { Component } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lab-angular-keycloack';

  public isLoggedIn = false;

  constructor(protected appService: AppService) {
  }

  ngOnInit() {
    this.isLoggedIn = this.appService.checkCredentials();    
    let i = window.location.href.indexOf('code');
    if(!this.isLoggedIn && i != -1) {
      this.appService.retrieveToken(window.location.href.substring(i + 5));
    }
  }

  login() {
    window.location.href = 
      `http://localhost:8080/realms/${this.appService.realm}/protocol/openid-connect/auth?response_type=code&scope=openid&client_id=${this.appService.clientId}&redirect_uri=${this.appService.redirectUri}`;
    }
 
  logout() {
    this.appService.logout();
  }
}
