import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'courseswebsite-app';

  constructor(private authService:AuthService){

  }


  ngOnInit(){
    this.authService.autoLogin();
  }
}
