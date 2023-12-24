// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JellyfishComponent } from './jellyfish/jellyfish.component';
import { JellyfishConhecidoComponent } from './jellyfish-conhecido/jellyfish-conhecido.component';
import { AdminComponent } from './admin/admin.component';
import { ContainerComponent } from './container/container.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'jellyfish', component: JellyfishComponent },
  { path: 'jellyconhecido', component: JellyfishConhecidoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'quizz', component: ContainerComponent },
];

declarations: [
  JellyfishComponent,
  JellyfishConhecidoComponent,
  AdminComponent,
  ContainerComponent,
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule, // Adicione o FormsModule aqui
    
  ],
  exports: [RouterModule]
})


export class AppRoutingModule {}