import { Component, OnInit } from "@angular/core";
import { User } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.repository';

interface tarefa {
  nome: string
  descricao: String
  categoria: String
}
@Component({
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent implements OnInit {
  title = 'todo-app';
  nome: string = '';
  tarefas: tarefa[] = this.defineLista();
  categorias: String[] = this.defineCategoria();
  categoriaCadastro: String = "";
  aparecer: boolean = false;
  adicionar: String = "+";
  cancelar: String = "-";
  adicionarTarefa: String = this.adicionar;
  private userId: string = 'joao';
  private users: User[] = [];
  user!: User;

  constructor(private userRepository: UserRepository) {
    this.users = this.userRepository.getUsers();
    this.user = this.getUsuarioLogado();
    console.log(this.user);
  }

  tarefa = {
    nome: '',
    descricao: '',
    categoria: 'Todo',
  }
  defineLista(): tarefa[] {
    let a: tarefa[] = [];
    if (localStorage.getItem('lista') != null) {
      return JSON.parse(localStorage.getItem("lista"))
    }
    return a;
  }
  defineCategoria(): String[] {
    let a: String[] = [];
    if (localStorage.getItem('listaCategoria') != null) {
      return JSON.parse(localStorage.getItem("listaCategoria"))
    }
    return a;
  }
  categoriaNova() {
    let categoriaNova = this.categoriaCadastro;
    let a = true;
    for (let categoria of this.categorias) {
      if (categoriaNova == categoria) {
        a = false;
      } 
    }

    if (categoriaNova != '' && a == true) {
      this.categorias.push(categoriaNova);
      localStorage.setItem('listaCategoria', JSON.stringify(this.categorias));
      this.categoriaCadastro = '';
      this.aparecer = false;
      this.adicionarTarefa = this.adicionar;
    } else {
      alert("Seu Campo de Categoria esta Vazio ou já Existe uma Categoria com este Nome")
    }
  }



  removerCategoria(indice): void {

    for (let tarefa of this.tarefas) {
      if (tarefa.categoria == this.categorias[indice]) {
        this.tarefas.splice(this.tarefas.indexOf(tarefa), 1);
      }
    }
    localStorage.setItem('lista', JSON.stringify(this.tarefas));
    this.categorias.splice(indice, 1);
    localStorage.setItem('listaCategoria', JSON.stringify(this.categorias));
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
    let categoriaNova = this.categoriaCadastro;
    this.aparecer = false;
    this.adicionarTarefa = this.adicionar;
    if(this.categorias.length == 0){
      categoriaNova = 'Sem Categoria'
      this.categorias.push(categoriaNova);
      localStorage.setItem('listaCategoria', JSON.stringify(this.categorias));
    }
    
  }
  cliqueEnter(event){
    if(event.key == 'Enter'){
      this.categoriaNova()
    }
  }
  hasPermission(permission: string): boolean {
    return this.user.cardPermissions.some((cardPermission) => cardPermission === permission);
  }
  private getUsuarioLogado(): User {
    return this.users.find((user) => user.id === this.userId) as User;
  }
}