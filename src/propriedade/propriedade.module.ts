import { CommonModule } from "@angular/common";
import { NgModule, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PropriedadeComponent } from "./propriedade.component";

@NgModule({
    declarations: [
        PropriedadeComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        PropriedadeComponent
    ]
})



export class PropriedadeModule {

}