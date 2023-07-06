import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor() { }
  setCookie(name: string, value: string) {
    document.cookie = name + "=" + value + "; path=/";
  }

  getCookie(name: string): string {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  }

  deleteCookie(name: string) {
    this.setCookie(name, "");
  }
  checkCookie(){
    const cookie = document.cookie;
    console.log(cookie);
    console.log(this.getCookie("UsuarioLogado"))
  }
}
