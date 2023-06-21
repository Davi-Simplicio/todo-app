import { Component, OnInit } from "@angular/core";

interface Tarefa {
  nome: string
  categoria: String,
  conteudo:any[],
  select:any[]
}
interface Propriedade {
  nome: string,
  tipo: string,
  select:any[],
  esconder: boolean

}
@Component({
  templateUrl: './propriedade.component.html',
  styleUrls: ['./propriedade.component.css']
})

export class PropriedadeComponent{
  title = 'todo-app';
  
  tarefas: Tarefa[] = this.defineLista();
  propriedades: Propriedade[] = this.definePropriedade();
  aparecer: boolean = false;
  adicionar: String = "+";
  cancelar: String = "-";
  adicionarTarefa: String = this.adicionar;
  escondido:String = "./imagens/visivel.png";
  aparecido:String = "./imagens/olho.png";
  novaOpcao:string;

  

  tarefa = {
    nome: '',
    conteudo:[],
    categoria: ' ',
    select:[]
  }

  propriedade:Propriedade = {
    nome:"",
    tipo:"",
    select:[],
    esconder:false
    

  }
  defineLista(): Tarefa[] {
    let a: Tarefa[] = [];
    if (localStorage.getItem('lista') != null) {
      return JSON.parse(localStorage.getItem("lista"))
    }
    return a;
  }
  definePropriedade(): Propriedade[] {
    let a: Propriedade[] = [];
    if (localStorage.getItem('listaPropriedade') != null) {
      return JSON.parse(localStorage.getItem("listaPropriedade"))
    }
    return a;
  }
  propriedadeNova() {
    let propriedadeNova:Propriedade = {
      nome: this.propriedade.nome,
      tipo: this.propriedade.tipo,
      select:this.propriedade.select,
      esconder:this.propriedade.esconder
    }  
    let a = true;
    for (let propriedade of this.propriedades) {
      if (propriedadeNova.nome == propriedade.nome) {
        a = false;
        console.log("A")
      } 
    }

    if (propriedadeNova.nome != '' && a == true) {
      this.propriedades.push(propriedadeNova);
      localStorage.setItem('listaPropriedade', JSON.stringify(this.propriedades));
      this.propriedade.nome = '';
      this.propriedade.tipo = '';
      this.aparecer = false;
      this.adicionarTarefa = this.adicionar;
      this.propriedade.select = [];
      
    } else {
      alert("Seu Campo de Categoria esta Vazio ou já Existe uma Categoria com este Nome")
    }
  }



  removerCategoria(indice): void {

    for (let tarefa of this.tarefas) {
      if (tarefa.categoria == this.propriedade.nome) {
        this.tarefas.splice(this.tarefas.indexOf(tarefa), 1);
      }
    }
    localStorage.setItem('lista', JSON.stringify(this.tarefas));
    this.propriedades.splice(indice, 1);
    localStorage.setItem('listaPropriedade', JSON.stringify(this.propriedades));
  }

  aparecerInput(): void {
    if (this.aparecer == false) {
      this.adicionarTarefa = this.cancelar;
      this.aparecer = true;
    } else {
      this.adicionarTarefa = this.adicionar;
    }
    

  }
  ngOnInit(): void {
    this.aparecer = false;
    this.adicionarTarefa = this.adicionar;
  }
  cliqueEnter(event){
    if(event.key == 'Enter'){
      this.propriedadeNova()
    }
  }
  definirOpcoesSelect(event):void{
    const e = event.target as HTMLInputElement;

    let permissao = true;
    for(let propriedade of this.propriedade.select){
      if(propriedade.nome == e.id){
        this.propriedade.select[this.propriedade.select.indexOf(propriedade)].valor = e.value;
        permissao = true;
      }
    }
    if(permissao){
      console.log(this.propriedade.select)
      this.propriedade.select.push(this.novaOpcao);
      localStorage.setItem('listaSelect', JSON.stringify(this.propriedade.select))
      this.novaOpcao = null;
    }
  }
  esconderPropriedadeFuncao(propriedade): void {
    if (!propriedade.esconder) {
      propriedade.esconder = true;
      localStorage.setItem('listaPropriedade',JSON.stringify(this.propriedades))
    } else {
      propriedade.esconder = false;
      localStorage.setItem('listaPropriedade',JSON.stringify(this.propriedades))
    }
  }
  imagemOlho(propriedade):String{
    if(propriedade.esconder){
      return this.escondido;  
    }else{
      return this.aparecido;
    }

  }

}