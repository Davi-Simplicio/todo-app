import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

interface tarefa{
  nome: string
  descricao: String
  categoria:String
}
interface OnInit{
  ngOnInit():void
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'todo-app';
  nome: string = '';
  tarefas: tarefa[] = this.defineLista();

  tarefa={
    nome: '',
    descricao:'',
    categoria:'Todo'
  }
  defineLista():tarefa[]{
    let a:tarefa [] = [];
    if(localStorage.getItem('lista') != null){
      return JSON.parse(localStorage.getItem("lista"))
    } 
    return a;
  }

  cadastrarTarefa():void{
    const trf:tarefa ={
      nome: this.tarefa.nome,
      descricao: this.tarefa.descricao,
      categoria: this.tarefa.categoria
    }
    if(this.tarefa.nome =='' && this.tarefa.descricao ==''){ 
    }else{
      this.tarefa.nome=null;
      this.tarefa.descricao=null;
      this.tarefa.categoria='Todo';
      this.tarefas.push(trf)
      localStorage.setItem('lista',JSON.stringify(this.tarefas));
    }
  }
  removerTarefa(indice):void{
    this.tarefas.splice(indice,1);   
    localStorage.setItem('lista',JSON.stringify(this.tarefas));
  }
  mudar():void{
    localStorage.setItem('lista',JSON.stringify(this.tarefas));
  }
} 
