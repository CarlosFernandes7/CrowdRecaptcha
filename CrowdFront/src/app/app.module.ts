// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';  // Adicione esta linha
import { JellyfishComponent } from './jellyfish/jellyfish.component';
import { ApiCrowdsourcingService } from './api-crowdsourcing.service';
import { HttpClientModule } from '@angular/common/http';
import { JellyfishRoutingModule } from './jellyfish/jellyfish-routing.module';
import { AdminComponent } from './admin/admin.component';
import { JellyfishConhecidoComponent } from './jellyfish-conhecido/jellyfish-conhecido.component';
import { ContainerComponent } from './container/container.component';
import { JellyfishListComponent } from './jellyfish-list/jellyfish-list.component';
import { HomeComponent } from './home/home.component';
import { AdminJellyListComponent } from './admin-jelly-list/admin-jelly-list.component';
import { AdminRespostasListComponent } from './admin-respostas-list/admin-respostas-list.component';
import { AdminNewjellyComponent } from './admin-newjelly/admin-newjelly.component';
import { AdminApiComponent } from './admin-api/admin-api.component';
import { UserComponent } from './user/user.component';
import { AdminUserlistComponent } from './admin-userlist/admin-userlist.component';
import { RegisterUserComponent } from './register-user/register-user.component';



@NgModule({
  declarations: [
    AppComponent,
    JellyfishComponent,
    AdminComponent,
    JellyfishConhecidoComponent,
    ContainerComponent,
    JellyfishListComponent,
    HomeComponent,
    AdminJellyListComponent,
    AdminRespostasListComponent,
    AdminNewjellyComponent,
    AdminApiComponent,
    UserComponent,
    AdminUserlistComponent,
    RegisterUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    HttpClientModule,
    JellyfishRoutingModule,
  ],
  providers: [ApiCrowdsourcingService],
  bootstrap: [AppComponent]
})
export class AppModule { }