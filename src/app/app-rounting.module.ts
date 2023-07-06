import { Component, NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { CategoriaComponent } from "src/categoria/categoria.component";
import { TodoComponent } from "src/todo/todo.component";
import { PropriedadeComponent } from "src/propriedade/propriedade.component";
import { AuthGuardService } from "src/services/auth-guard.service";
import {PaginaCadastroComponent} from "src/pagina-cadastro/pagina-cadastro.component";
import { PaginaLoginComponent } from "src/pagina-login/pagina-login.component";

const rotas:Route[]=[{
    path: 'categoria',
    component:CategoriaComponent, 
    canActivate:[AuthGuardService]  
},{
    path: 'todo',
    component:TodoComponent,
    canActivate:[AuthGuardService]  
},{
    path: 'propriedade',
    component:PropriedadeComponent,
    canActivate:[AuthGuardService]  
},
{
    path: 'pagina-cadastro',
    component:PaginaCadastroComponent
},
{
    path: 'pagina-login',
    component:PaginaLoginComponent
},{
    path:'',
    pathMatch:'full',
    redirectTo:'pagina-login'
}
];

@NgModule({
    imports:[RouterModule.forRoot(rotas)],
    exports:[RouterModule]

})

export class AppRoutingModule{};


 
