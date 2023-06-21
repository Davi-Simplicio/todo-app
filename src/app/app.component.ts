import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.repository';



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

  private userId: string = 'davi';
  private users:User[] = [];
  private user:User|undefined;

  constructor(

    private userRepository: UserRepository
  ){
    this.users = this.userRepository.getUsers();
    this.user = this.getUsuarioLogado();
    console.log(this.user);
  }

  private hasPermission(permission:string):boolean{
    return 
  }

  private getUsuarioLogado():User{
    return this.users.find((user) => {
    return user.id === this.userId
    });
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
