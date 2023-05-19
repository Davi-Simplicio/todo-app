import { Component, OnInit } from '@angular/core';


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
