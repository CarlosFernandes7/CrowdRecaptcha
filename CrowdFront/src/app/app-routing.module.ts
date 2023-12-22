// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JellyfishComponent } from './jellyfish/jellyfish.component';
import { JellyfishConhecidoComponent } from './jellyfish-conhecido/jellyfish-conhecido.component';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule

const routes: Routes = [
  // ... outras rotas ...
  { path: 'jellyfish', component: JellyfishComponent },
  { path: 'jellyconhecido', component: JellyfishConhecidoComponent },
  { path: 'admin', component: AdminComponent },
];

declarations: [
  JellyfishComponent,
  JellyfishConhecidoComponent,
  AdminComponent,
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule, // Adicione o FormsModule aqui
    
  ],
  exports: [RouterModule]
})


export class AppRoutingModule {}