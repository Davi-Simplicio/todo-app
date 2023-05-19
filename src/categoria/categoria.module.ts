import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CategoriaComponent } from "./categoria.component";

@NgModule({
    declarations: [
        CategoriaComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        CategoriaComponent
    ]
})

export class CategoriaModule { }