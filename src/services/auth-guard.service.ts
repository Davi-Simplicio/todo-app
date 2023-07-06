import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CookieService } from '../app/cookie.service';

@Injectable()
export class AuthGuardService implements CanActivate{
    constructor(private cookieService:CookieService){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if(!this.verificaLogin()){
            return true;
        }
            alert("Faça Login Primeiro")
            window.location.replace("http://localhost:4200/pagina-login")
            return false;

    }
    verificaLogin(){
        const cookies = document.cookie;
       if(cookies===""){
            return true;
       }
    }
    


   

    
    

}