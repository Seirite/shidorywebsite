/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import {Injectable} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Injectable()


export class ResourceBundle{
    
    constructor(public translate:TranslateService)
    {

    this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de', 'zh-CHS','hi']);
        this.translate.setDefaultLang('en');
        const browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de|zh-CHS|hi/) ? browserLang : 'en');
       
    }
    
    
    changeLang(language: string) {
        this.translate.use(language);
    }
    
    
}