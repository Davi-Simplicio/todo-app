import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PaginaLoginComponent } from "./pagina-login.component";

@NgModule({
    declarations: [
        PaginaLoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        PaginaLoginComponent
    ]
})

export class PaginaLoginModule { }