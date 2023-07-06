import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/users/user';
import { UserRepository } from '../repositories/user.repository'

@Component({
  selector: 'app-pagina-cadastro',
  templateUrl: './pagina-cadastro.component.html',
  styleUrls: ['./pagina-cadastro.component.css']
})
export class PaginaCadastroComponent implements OnInit {
  id:string
  nome:string
  senha:string
  email:string


  constructor(private userRepository:UserRepository) {
    
   }
   
  ngOnInit() {
  }

  cadastraUsuario(){
    const user:User = {
      id:this.id,
      nome:this.nome,
      senha:this.senha,
      email:this.email

    }

    this.userRepository.sendUsers(user).subscribe();
  }

}
