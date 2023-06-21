import { Component, OnInit } from "@angular/core";


interface Tarefa {
  nome: string,
  categoria: String,
  conteudo:any[],
  select:any[] 
}
interface Propriedade {
  nome: string,
  tipo: string,
  esconder:boolean
  
}
@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})

export class TodoComponent implements OnInit {
  title = 'todo-app';
  nome: string = '';
  tarefas: Tarefa[] = this.defineLista();
  propriedades: Propriedade[] = this.definePropriedade();
  categorias: String[] = this.defineCategoria();
  categoriaCadastro: String = "";
  aparecer: boolean = false;
  adicionar: String = "+";
  cancelar: String = "-";
  adicionarTarefa: String = this.adicionar;
  escondido:String = "./imagens/visivel.png";
  aparecido:String = "./imagens/olho.png";
  quadrado:boolean = false;


  tarefa = {
    nome: null,
    conteudo:[], 
    categoria: '',
    select:[]
    
  }
  propriedade = {
    nome:"",
    tipo:"",
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

  ngOnInit(): void {
    this.aparecer = false;
    this.adicionarTarefa = this.adicionar;
    JSON.parse(localStorage.getItem("listaPropriedade"))
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
      conteudo:this.tarefa.conteudo,
      categoria: this.tarefa.categoria,
      select:this.tarefa.select
    }

   
      if (this.tarefa.categoria == '') {
        if (this.tarefa.nome != null) {
        this.tarefa.nome = null;
        this.tarefa.categoria = 'Sem Categoria';
        trf.categoria = 'Sem Categoria'
        this.tarefas.push(trf)
        localStorage.setItem('lista', JSON.stringify(this.tarefas));
        this.aparecer = false;
        this.adicionarTarefa = this.adicionar;
        
      } else {
        trf.nome = "Sem Título"
        trf.categoria = 'Sem Categoria'
        this.tarefa.categoria = '';
        this.tarefas.push(trf)
        localStorage.setItem('lista', JSON.stringify(this.tarefas));
        this.tarefa.nome = null;
        this.aparecer = false;
        this.adicionarTarefa = this.adicionar;
      }
    } else {
      this.tarefa.nome = null;
      this.tarefa.categoria = '';
      this.tarefas.push(trf)
      localStorage.setItem('lista', JSON.stringify(this.tarefas));
      this.aparecer = false;
      this.adicionarTarefa = this.adicionar;
    }
    this.tarefa.conteudo = [];
  }

  pegarValor(nome, tarefa){
    for(let propriedade of tarefa.conteudo){
      if(propriedade.nome == nome){
        return propriedade.valor;
      }
    }
    return "";
  }

  removerTarefa(indice): void {
    this.tarefas.splice(indice, 1);
    localStorage.setItem('lista', JSON.stringify(this.tarefas));
  }
  mudar(): void {
    localStorage.setItem('lista', JSON.stringify(this.tarefas));
  }
  aparecerInput(): boolean {
    if (this.aparecer == false) {
      this.adicionarTarefa = this.cancelar;
      return this.aparecer = true;
    } else {
      this.adicionarTarefa = this.adicionar;
      this.tarefa.nome = null;

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
    }


    dragOver(categoria:String){
      event.preventDefault();
      localStorage.setItem('categoriaDrag', JSON.stringify(categoria));

    }

    dragStart(indice:number){
      localStorage.setItem('indice', JSON.stringify(indice));
    }


    dragOverTarefa(indice:number){
      if(indice != JSON.parse(localStorage.getItem('indice'))){
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
    i=0;

    definirPropriedades(event):void{
      const evet = event.target as HTMLInputElement;
      
      let permissao = true;
      for(let propriedade of this.tarefa.conteudo){
        if(propriedade.nome == evet.id){
          this.tarefa.conteudo[this.tarefa.conteudo.indexOf(propriedade)].valor = evet.value;
          permissao = false;
        }
      }
      if(permissao){
        this.tarefa.conteudo.push({nome:evet.id, valor:evet.value});
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