import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/users/user';
import { UserRepository } from '../repositories/user.repository'
import { CookieService } from '../app/cookie.service';
import { AuthGuardService } from 'src/services/auth-guard.service';

@Component({
  selector: 'app-pagina-login',
  templateUrl: './pagina-login.component.html',
  styleUrls: ['./pagina-login.component.css']
})
export class PaginaLoginComponent implements OnInit {
    users:User[] = [];
   user!:User;
   id:string;
   senha:string;
  
   constructor(private userRepository: UserRepository,private cookieService: CookieService) {
    userRepository.getUsers().subscribe({
      next: (value) => {
        this.users = value;
        this.user = this.getUsuarioLogado();
      }
    })

  }
  ngOnInit(): void {
    this.cookieService.checkCookie();
  }
   logaUsuario():void{
      this.users.forEach(element => {
        if(element.id == this.id && element.senha == this.senha){
            this.cookieService.setCookie("UsuarioLogado",JSON.stringify(element)); 
            window.location.replace('http://localhost:4200/todo')
            
        }
      });
   }
   private getUsuarioLogado(): User {
    return this.users.find((user) => user.id === this.id) as User;
  }

}
