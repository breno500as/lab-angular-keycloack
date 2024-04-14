import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 


export interface UserProfile {
  sub: string;
  email: string;
  given_name: string;
  family_name: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public clientId = 'login-app';
  public redirectUri = 'http://localhost:4200/';
  public realm = 'SpringBootKeycloakRealm';

  private accessToken = 'access_token';

  private idToken = 'id_token';

  constructor(protected httpClient: HttpClient) { }

  retrieveToken(code: any) {
    let params = new URLSearchParams();   
    params.append('grant_type','authorization_code');
    params.append('client_id', this.clientId);
    params.append('redirect_uri', this.redirectUri);
    params.append('code',code);

    let headers = 
      new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'});
       
      this.httpClient.post(`http://localhost:8080/realms/${this.realm}/protocol/openid-connect/token`, 
        params.toString(), { headers: headers })
        .subscribe(
          data => this.saveToken(data)); 
  }

  saveToken(token: any) {
    console.log(token.access_token);
    window.localStorage.setItem(this.accessToken, token.access_token);
    window.localStorage.setItem(this.idToken, token.id_token);
    window.location.href = this.redirectUri;
  }

  getResource(resourceUrl: any) : Observable<any> {
    var headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 
      'Authorization': 'Bearer '+  window.localStorage.getItem(this.accessToken)});
    return this.httpClient.get(resourceUrl, { headers: headers });
                
  }

  checkCredentials(): boolean {
    return window.localStorage.getItem(this.accessToken) !== null;
  } 

  logout() { 
  //&id_token_hint=${window.localStorage.getItem(this.idToken)}&post_logout_redirect_uri=${this.redirectUri}
  //&post_logout_redirect_uri=${this.redirectUri}&id_token_hint=${token}`
   const token = window.localStorage.getItem(this.idToken);
    window.location.href = `http://localhost:8080/realms/${this.realm}/protocol/openid-connect/logout`;
    window.localStorage.clear();
  }

 
}
