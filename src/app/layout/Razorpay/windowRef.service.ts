/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import { Injectable } from '@angular/core';

function _window() : any {
   // return the global native browser window object
   return window;
}

@Injectable()
export class WindowRef {
   get nativeWindow() : any {
      return _window();
   }
}