import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/users/user';
import { UserRepository } from '../repositories/user.repository';
// import { CookieService } from 'ngx-cookie-service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  aparecer: boolean = false;
  adicionar: String = "☰";
  cancelar: String = "-";
  adicionarTarefa: String = this.adicionar;
  title = "teste-app";

  private users:User[] = [];
  private user:User|undefined;

  
  constructor(private userRepository: UserRepository){
    userRepository.getUsers().subscribe({
      next: (value) => {
        this.users = value
        console.log(this.users)
      }
    })
  }


  aparecerInput(): boolean {
    if (this.aparecer == false) {
      this.adicionarTarefa = this.cancelar;
      return this.aparecer = true;
    } else {
      this.adicionarTarefa = this.adicionar;
    }
    return this.aparecer = false;
  }
  ngOnInit(): void {
    this.aparecer = false;
    this.adicionarTarefa = this.adicionar;
  }
  reiniciar() {
    this.aparecer = false;
    this.adicionarTarefa = this.adicionar;
  }
} 
