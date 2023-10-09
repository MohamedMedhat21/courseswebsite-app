import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { Utils } from './utils/utils';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from './interface/lang';
import { Constants } from './utils/Constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'courseswebsite-app';
  globalMessage: Message[];

  constructor(private authService:AuthService,public translateService:TranslateService){
  }


  ngOnInit(){
    Utils.errorMessage.subscribe(msg =>{
      this.globalMessage = [
        { severity: 'error', summary: 'Error', detail: msg }
      ];
    })
    this.authService.autoLogin();
    const lang:Lang = JSON.parse(localStorage.getItem('lang')!) || Constants.langs[1];
    this.translateService.use(lang.code)
  }
}
