import { CommonModule } from "@angular/common";
import { NgModule, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TodoComponent} from "./todo.component";

@NgModule({
    declarations:[
        TodoComponent
    ],
    imports:[
        CommonModule,
        FormsModule
    ],
    exports:[
        TodoComponent
    ]
})

  

export class TodoModule {

}