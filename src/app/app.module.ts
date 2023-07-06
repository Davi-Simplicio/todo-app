import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-rounting.module';
import { CategoriaModule} from 'src/categoria/categoria.module';
import { TodoModule} from 'src/todo/todo.module';
import { PropriedadeModule } from 'src/propriedade/propriedade.module';
import { UserRepository } from 'src/repositories/user.repository';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from 'src/services/auth-guard.service';
import { PaginaCadastroComponent } from '../pagina-cadastro/pagina-cadastro.component';
import { PaginaLoginComponent } from 'src/pagina-login/pagina-login.component';


@NgModule({
  declarations: [
    AppComponent,
    PaginaCadastroComponent,
    PaginaLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CategoriaModule,
    TodoModule,
    PropriedadeModule,
    HttpClientModule
  ],
  providers: [
    UserRepository,
    AuthGuardService
    

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
