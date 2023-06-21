import { CommonModule } from "@angular/common";
import { Component, NgModule, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TodoModule } from "src/todo/todo.module";
import { PropriedadeComponent } from "./propriedade.component";

@NgModule({
    declarations: [
        PropriedadeComponent
    ],
    imports: [
        CommonModule,
        TodoModule,
        FormsModule
    ],
    exports: [
        PropriedadeComponent
    ]
})



export class PropriedadeModule { }