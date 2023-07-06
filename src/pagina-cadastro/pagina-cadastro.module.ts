import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PaginaCadastroComponent } from "./pagina-cadastro.component";

@NgModule({
    declarations: [
        PaginaCadastroComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        PaginaCadastroComponent
    ]
})

export class PaginaCadastroModule { }