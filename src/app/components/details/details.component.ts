import { Component } from '@angular/core';
import { AppService } from '../../services/app.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  protected user = new User(1,'sample');
  
  private url = 'http://localhost:8081/private/customers';  

  constructor(private service: AppService) {}

  getUser() {
    this.service.getResource(this.url)
      .subscribe(
         data => this.user = data);
    }

}
