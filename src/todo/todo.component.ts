import { Component, OnInit } from "@angular/core";
import { User } from 'src/models/users/user';
import { UserRepository } from 'src/repositories/user.repository';
import { CookieService } from '../app/cookie.service';

interface Tarefa {
  nome: string,
  categoria: string,
  conteudo: any[],
  select: any[] 
}

interface Propriedade {
  nome: string,
  tipo: string,
  esconder: boolean
}

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  conteudoInput:string;
  title = 'todo-app';
  nome: string = '';
  tarefas: Tarefa[] = this.defineLista();
  propriedades: Propriedade[] = this.definePropriedade();
  categorias: string[] = this.defineCategoria();
  categoriaCadastro: string = "";
  aparecer: boolean = false;
  adicionar: string = "+";
  cancelar: string = "-";
  adicionarTarefa: string = this.adicionar;
  escondido: string = "./imagens/visivel.png";
  aparecido: string = "./imagens/olho.png";
  quadrado: boolean = false;
  ordenaSelect: boolean = false;
  
  private users: User[] = [];
  user!: User;
   userLocalStorage = JSON.parse(this.cookieService.getCookie("UsuarioLogado"))
  idString = JSON.stringify(this.userLocalStorage.id);
  constructor(private userRepository: UserRepository,private cookieService:CookieService) {
    userRepository.getUsers().subscribe({
      next: (value) => {
        console.log(value)
        this.getUsuarioLogado();
      }
    })

    this.tarefas = JSON.parse(localStorage.getItem(this.idString))
  }

  tarefa = {
    nome: null,
    conteudo: [], 
    categoria: '',
    select: []
  };

  propriedade = {
    nome: "",
    tipo: "",
    esconder: false
  };

  ngOnInit(): void {
    this.aparecer = false;
    this.adicionarTarefa = this.adicionar;
    JSON.parse(localStorage.getItem("listaPropriedade"));
  }

    getUsuarioLogado(): User {
    return this.users.find((user) => user.id === this.user.id) as User;
  }

  defineLista(): Tarefa[] {
    let a: Tarefa[] = [];
    if (localStorage.getItem(this.idString) != null) {
      console.log("Entrou")
      return JSON.parse(localStorage.getItem(this.idString));
    }
    console.log("não Entrou")
    return a;
  }

  definePropriedade(): Propriedade[] {
    let a: Propriedade[] = [];
    if (localStorage.getItem('listaPropriedade') != null) {
      return JSON.parse(localStorage.getItem("listaPropriedade"));
    }
    return a;
  }

  defineCategoria(): string[] {
    
    let a: string[] = [];
    if (localStorage.getItem('listaCategoria') != null) {
      return JSON.parse(localStorage.getItem("listaCategoria"));
    }
    return a;
  }

  cadastrarTarefa(): void {

    const trf: Tarefa = {
      nome: this.tarefa.nome,
      conteudo: this.tarefa.conteudo,
      categoria: this.tarefa.categoria,
      select: this.tarefa.select
    };

    if (!this.hasPermission('Add')) {
      alert('Não pode cadastrar');
      return;
    } else {
      if (this.tarefa.categoria === '') {
        if (this.tarefa.nome !== null) {
          this.tarefa.nome = null;
          this.tarefa.categoria = 'Sem Categoria';
          trf.categoria = 'Sem Categoria';
          this.tarefas.push(trf);
          localStorage.setItem(this.idString,JSON.stringify(this.tarefas));
          this.aparecer = false;
          this.adicionarTarefa = this.adicionar;
        } else {
          trf.nome = "Sem Título";
          trf.categoria = 'Sem Categoria';
          this.tarefa.categoria = '';
          this.tarefas.push(trf);
          localStorage.setItem(this.idString, JSON.stringify(this.tarefas));
          this.tarefa.nome = null;
          this.aparecer = false;
          this.adicionarTarefa = this.adicionar;
        }
      } else {
        this.tarefa.nome = null;
        this.tarefa.categoria = '';
        this.tarefas.push(trf);
        localStorage.setItem(this.idString, JSON.stringify(this.tarefas));
        this.aparecer = false;
        this.adicionarTarefa = this.adicionar;
      }
      this.tarefa.conteudo = [];
    }
  }

  pegarValor(nome, tarefa) {
    for (let propriedade of tarefa.conteudo) {
      if (propriedade.nome == nome) {
        return propriedade.valor;
      }
    }
    return "";
  }

  removerTarefa(indice): void {
    if (!this.hasPermission('MoveCard')) {
      alert('Não pode Mover');
      return;
    } else {
      this.tarefas.splice(indice, 1);
      localStorage.setItem(this.idString, JSON.stringify(this.tarefas));
    }
  
    }

  mudar(): void {
    localStorage.setItem(this.idString, JSON.stringify(this.tarefas));
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

  hasPermission(permission: string): boolean {
    //return this.user.cardPermissions.some((cardPermission) => cardPermission === permission);
    return true
  }

  dragEnd(tarefa: Tarefa) {
    if (!this.hasPermission('MoveCard')) {
      alert('Não pode Mover');
      return;
    } else {
      tarefa.categoria = JSON.parse(localStorage.getItem('categoriaDrag'));  
      let indice = JSON.parse(localStorage.getItem('indice'));
      localStorage.setItem(this.idString, JSON.stringify(this.tarefas));
      this.quadrado = false;
      this.tarefas.splice(indice + 1, 0);
      this.tarefas.splice(this.tarefas.indexOf(tarefa), 1);
      this.tarefas.splice(indice, 0, tarefa);
    }

  }

  dragOver(categoria: string) {
    event.preventDefault();
    localStorage.setItem('categoriaDrag', JSON.stringify(categoria));
  }

  dragStart(indice: number) {
    if (!this.hasPermission('MoveCard')) {
      alert('Não pode Mover');
      return;
    } else {
      localStorage.setItem('indice', JSON.stringify(indice));
    }
    
  }

  dragOverTarefa(indice: number) {
    if (indice !== JSON.parse(localStorage.getItem('indice'))) {
      // Perform some logic
    }
  }

  dragOverIndice(indice) {
    localStorage.setItem('indice', indice);
  }

  cliqueEnter(event) {
    if (event.key == 'Enter') {
      this.cadastrarTarefa();
    }
  }

  i = 0;

  definirPropriedades(): void {
      this.tarefa.conteudo.push(this.conteudoInput);
      localStorage.setItem(this.idString, JSON.stringify(this.tarefa));
  }
  esconderPropriedadeFuncao(propriedade): void {
    if (!propriedade.esconder) {
      propriedade.esconder = true;
      localStorage.setItem('listaPropriedade', JSON.stringify(this.propriedades));
    } else {
      propriedade.esconder = false;
      localStorage.setItem('listaPropriedade', JSON.stringify(this.propriedades));
    }
  }

  imagemOlho(propriedade): string {
    if (propriedade.esconder) {
      return this.escondido;  
    } else {
      return this.aparecido;
    }
  }

  mudarOrdenacao() {
    this.ordenaSelect = !this.ordenaSelect;
  }
}
