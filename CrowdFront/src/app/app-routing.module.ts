// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JellyfishComponent } from './jellyfish/jellyfish.component';
import { FormsModule } from '@angular/forms'; // Importe o FormsModule


const routes: Routes = [
  // ... outras rotas ...
  // { path: '', redirectTo: '/jellyfish', pathMatch: 'full' },
  { path: 'jellyfish', component: JellyfishComponent },
];

declarations: [
  JellyfishComponent,
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    FormsModule, // Adicione o FormsModule aqui
  ],
  exports: [RouterModule]
})


export class AppRoutingModule {}