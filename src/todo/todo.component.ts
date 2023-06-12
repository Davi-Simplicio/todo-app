import { Component, OnInit } from "@angular/core";
import { forEach } from "@angular/router/src/utils/collection";

interface Tarefa {
  nome: string
  descricao: String
  categoria: String
}
@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  title = 'todo-app';
  nome: string = '';
  tarefas: Tarefa[] = this.defineLista();
  categorias: String[] = this.defineCategoria();
  categoriaCadastro: String = "";
  aparecer: boolean = false;
  adicionar: String = "+";
  cancelar: String = "-";
  adicionarTarefa: String = this.adicionar;
  quadrado:boolean = false;


  tarefa = {
    nome: null,
    descricao: null,
    categoria: '',
    
  }
  defineLista(): Tarefa[] {
    let a: Tarefa[] = [];
    if (localStorage.getItem('lista') != null) {
      return JSON.parse(localStorage.getItem("lista"))
    }
    return a;
  }

  ngOnInit(): void {
    this.aparecer = false;
    this.adicionarTarefa = this.adicionar;
  }
  defineCategoria(): String[] {
    let a: String[] = [];
    if (localStorage.getItem('listaCategoria') != null) {
      return JSON.parse(localStorage.getItem("listaCategoria"))
    }
    return a;
  }

  cadastrarTarefa(): void {
    const trf: Tarefa = {
      nome: this.tarefa.nome,
      descricao: this.tarefa.descricao,
      categoria: this.tarefa.categoria
    }

    if (this.tarefa.nome != null || this.tarefa.descricao != null) {
      if (this.tarefa.categoria == '') {
        alert("Adicione uma Categoria Antes de Adicionar uma Tarefa")
      } else {
        this.tarefa.nome = null;
        this.tarefa.descricao = null;
        this.tarefa.categoria = '';
        this.tarefas.push(trf)
        localStorage.setItem('lista', JSON.stringify(this.tarefas));
        this.aparecer = false;
        this.adicionarTarefa = this.adicionar;
      }

    } else {
      this.tarefa.nome = null;
      this.tarefa.descricao = null;
      this.aparecer = false;
      this.adicionarTarefa = this.adicionar;
      alert("Preencha o campo de Nome ou Descrição")
    }

  }
  removerTarefa(indice): void {
    this.tarefas.splice(indice, 1);
    localStorage.setItem('lista', JSON.stringify(this.tarefas));
  }
  mudar(): void {
    localStorage.setItem('lista', JSON.stringify(this.tarefas));
  }
  categoriaNova() {
    let categoriaNova = this.categoriaCadastro;
    if (categoriaNova != '') {
      this.categorias.push(categoriaNova);
      localStorage.setItem('listaCategoria', JSON.stringify(this.categorias));
      this.categoriaCadastro = '';
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
      this.tarefa.nome = null;
      this.tarefa.descricao = null;

    }
    return this.aparecer = false;
  }
    drag(indice){

    }

    dragEnd(tarefa:Tarefa){
      tarefa.categoria = JSON.parse(localStorage.getItem('categoriaDrag'));  
      let indice = JSON.parse(localStorage.getItem('indice'))
      localStorage.setItem('lista', JSON.stringify(this.tarefas))
      this.quadrado=false;
      this.tarefas.splice(indice+1, 0);

      this.tarefas.splice(this.tarefas.indexOf(tarefa), 1)
      this.tarefas.splice(indice, 0, tarefa)
      
      for(let percorrer of this.tarefas){
        if(percorrer.nome == " " && percorrer.descricao == " "){
          indice = this.tarefas.indexOf(percorrer);
          this.tarefas.splice(indice,1)
          this.cont = 0;
        }
      }
        
     
      

    }

    apagaQuadrado(indice:number){
      for(let percorrer of this.tarefas){
        if(percorrer.nome == " " && percorrer.descricao == " "){
          indice = this.tarefas.indexOf(percorrer);
          this.tarefas.splice(indice,1)
          this.cont = 0;
        }
      }
    }

    dragOver(categoria:String){
      event.preventDefault();
      localStorage.setItem('categoriaDrag', JSON.stringify(categoria));

    }

    dragStart(indice:number){
      localStorage.setItem('indice', JSON.stringify(indice));
    }

    cont = 0;
    dragOverTarefa(indice:number){
      if(indice != JSON.parse(localStorage.getItem('indice'))){
        if(this.cont==0){
          this.tarefas.splice(indice, 0, {nome:" ", descricao:" ", categoria: this.tarefas[indice].categoria})
          this.cont++
        }
      }
    }
    dragOverIndice(indice){
      localStorage.setItem('indice',indice)
    }
    cliqueEnter(event){
      if(event.key == 'Enter'){
        this.cadastrarTarefa()
      }
    }

    
}