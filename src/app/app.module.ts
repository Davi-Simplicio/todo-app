import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-rounting.module';
import { CategoriaModule} from 'src/categoria/categoria.module';
import { TodoModule} from 'src/todo/todo.module';
import { PropriedadeModule } from 'src/propriedade/propriedade.module';
import { UserRepository } from 'src/repositories/user.repository';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    CategoriaModule,
    TodoModule,
    PropriedadeModule
  ],
  providers: [
    UserRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
