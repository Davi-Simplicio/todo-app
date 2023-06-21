import { Component, NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { CategoriaComponent } from "src/categoria/categoria.component";
import { TodoComponent } from "src/todo/todo.component";
import { PropriedadeComponent } from "src/propriedade/propriedade.component";

const rotas:Route[]=[{
    path: 'categoria',
    component:CategoriaComponent   
},{
    path: 'todo',
    component:TodoComponent
},{
    path: 'propriedade',
    component:PropriedadeComponent
},{
    path:'',
    pathMatch:'full',
    redirectTo:'todo'
}
];

@NgModule({
    imports:[RouterModule.forRoot(rotas)],
    exports:[RouterModule]

})

export class AppRoutingModule{};


 
