// jellyfish-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JellyfishComponent } from './jellyfish.component';

const routes: Routes = [
    { path: 'jellyfish', component: JellyfishComponent },
    { path: 'jellyfish/:id', component: JellyfishComponent },
  // Add other routes as needed
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JellyfishRoutingModule {}
