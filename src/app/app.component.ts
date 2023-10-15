import { Component } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Lang } from './core/interface/lang';
import { Constants } from './core/utils/Constants';
import { Utils } from './core/utils/utils';
import { AuthService } from './modules/auth/services/auth.service';

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

    Utils.warningMessage.subscribe(msg =>{
      this.globalMessage = [
        { severity: 'warn', summary: 'Waning', detail: msg }
      ];
    })
    this.authService.autoLogin();
    const lang:Lang = JSON.parse(localStorage.getItem('lang')!) || Constants.langs[1];
    this.translateService.use(lang.code)
    document.documentElement.lang = lang.code;
  }
}
