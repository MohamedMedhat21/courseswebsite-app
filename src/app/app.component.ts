import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Utils } from './utils/utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'courseswebsite-app';
  globalMessage: Message[];

  constructor(private authService:AuthService){

  }


  ngOnInit(){
    Utils.errorMessage.subscribe(msg =>{
      this.globalMessage = [
        { severity: 'error', summary: 'Error', detail: msg }
    ];
    })
    this.authService.autoLogin();
  }
}
