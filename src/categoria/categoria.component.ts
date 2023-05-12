
import { Component } from "@angular/core";

interface tarefa{
    nome: string
    descricao: String
    categoria:String
  }
@Component({
    templateUrl:'./categoria.component.html',
    styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent{
    title = 'todo-app';
    nome: string = '';
    tarefas: tarefa[] = this.defineLista();
    categorias:String[] = this.defineCategoria();
    categoriaCadastro:String = "";
    aparecer:boolean = false;
    adicionar:String = "+";
    cancelar:String = "-";
    adicionarTarefa:String = this.adicionar;
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
}