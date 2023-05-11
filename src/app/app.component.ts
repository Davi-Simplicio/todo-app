import { Component, OnInit } from '@angular/core';

interface tarefa{
  nome: string
  descricao: String
  categoria:String
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'todo-app';
  nome: string = '';
  tarefas: tarefa[] = this.defineLista();
  categorias:String[] = this.defineCategoria();
  categoriaCadastro:String = "";
  aparecer:boolean = false;
  adicionar:String = "+";
  cancelar:String = "-";
  adicionarTarefa:String = this.adicionar;

ngOnInit(){
    if(this.categorias.length == 0){
      this.categorias.push('Todo')
      this.categorias.push('Doing')
      this.categorias.push('Done')


    }
}

  tarefa={
    nome: '',
    descricao:'',
    categoria:'Todo',
  }
  defineLista():tarefa[]{
    let a:tarefa [] = [];
    if(localStorage.getItem('lista') != null){
      return JSON.parse(localStorage.getItem("lista"))
    } 
    return a;
  }
  defineCategoria():String[]{
    let a:String [] = [];
    if(localStorage.getItem('listaCategoria') != null){
      return JSON.parse(localStorage.getItem("listaCategoria"))
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
    this.aparecer = false;
    this.adicionarTarefa = this.adicionar;
  }
  removerTarefa(indice):void{
    this.tarefas.splice(indice,1);   
    localStorage.setItem('lista',JSON.stringify(this.tarefas));
  }
  mudar():void{
    localStorage.setItem('lista',JSON.stringify(this.tarefas));
  }
  categoriaNova(){
    let categoriaNova = this.categoriaCadastro;
    if(categoriaNova!=''){
      this.categorias.push(categoriaNova);
      localStorage.setItem('listaCategoria',JSON.stringify(this.categorias));
      this.categoriaCadastro = '';
    }

  }
  removerCategoria(indice):void{

    for(let tarefa of this.tarefas){
      if(tarefa.categoria == this.categorias[indice]){
        this.tarefas.splice(this.tarefas.indexOf(tarefa), 1);
      }
    }
    localStorage.setItem('lista',JSON.stringify(this.tarefas));
    this.categorias.splice(indice,1);   
    localStorage.setItem('listaCategoria',JSON.stringify(this.categorias));
  }
  aparecerInput():boolean{
    if(this.aparecer == false){
      this.adicionarTarefa = this.cancelar;
      return this.aparecer = true;
    }else{
      this.adicionarTarefa=this.adicionar;
      
    }
    return this.aparecer = false;
    
  }
} 
