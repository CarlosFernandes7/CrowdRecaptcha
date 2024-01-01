// app-routing.module.ts
import { FormsModule } from '@angular/forms'; 
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JellyfishComponent } from './jellyfish/jellyfish.component';
import { JellyfishConhecidoComponent } from './jellyfish-conhecido/jellyfish-conhecido.component';
import { AdminComponent } from './admin/admin.component';
import { ContainerComponent } from './container/container.component';
import { HomeComponent } from './home/home.component';
import { AdminJellyListComponent } from './admin-jelly-list/admin-jelly-list.component';
import { AdminRespostasListComponent } from './admin-respostas-list/admin-respostas-list.component';
import { AdminNewjellyComponent } from './admin-newjelly/admin-newjelly.component';
import { AdminApiComponent } from './admin-api/admin-api.component';
import { UserComponent } from './user/user.component';
import { AdminUserlistComponent } from './admin-userlist/admin-userlist.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'jellyfish', component: JellyfishComponent },
//   { path: 'jellyconhecido', component: JellyfishConhecidoComponent },
//   { path: 'home', component: HomeComponent },
//   { path: 'admin', component: AdminComponent },
//   { path: 'admin/list', component: AdminJellyListComponent },
//   { path: 'admin/answers', component: AdminRespostasListComponent },
//   { path: 'admin/newjelly', component: AdminNewjellyComponent },
//   { path: 'quizz', component: ContainerComponent },
// ];
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'jellyfish', component: JellyfishComponent },
  { path: 'jellyconhecido', component: JellyfishConhecidoComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  // { path: 'userlist', component: UserlistComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'list', component: AdminJellyListComponent },
      { path: 'userlist', component: AdminUserlistComponent },
      { path: 'answers', component: AdminRespostasListComponent },
      { path: 'newjelly', component: AdminNewjellyComponent },
      { path: 'api', component: AdminApiComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }, 
    ]
  },
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
    FormsModule, 
    
  ],
  exports: [RouterModule]
})


export class AppRoutingModule {}