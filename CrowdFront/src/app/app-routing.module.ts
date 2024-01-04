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
import { AdminUserlistComponent } from './admin-userlist/admin-userlist.component';
import { RegisterComponent } from './register/register.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { LoginComponent } from './login/login.component';
import { AdminJellyfishunknownListComponent } from './admin-jellyfishunknown-list/admin-jellyfishunknown-list.component';

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
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
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
      { path: 'register', component: AdminRegisterComponent },
      { path: 'listunknown', component: AdminJellyfishunknownListComponent },
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