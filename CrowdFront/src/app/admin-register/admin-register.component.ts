import { Component } from '@angular/core';
import { ApiCrowdsourcingService } from '../api-crowdsourcing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrl: './admin-register.component.css'
})
export class AdminRegisterComponent {


  utilizadores = {
    nome: '',
    email: '',
    password: ''
  };

  constructor(private apiCrowdsourcingService: ApiCrowdsourcingService, private router: Router) { }  // Adicione o Router aqui

  
  registaAdminUtilizadores() {
    this.apiCrowdsourcingService.registerUser(this.utilizadores)
      .subscribe(
        response => {
          console.log('User registered successfully:', response);
          this.utilizadores = { nome: '', email: '', password: '' };

          // Redirecione para a página inicial após o registro bem-sucedido
          this.router.navigate(['/home']);  // '/home' se a sua rota inicial for /home
        },
        error => {
          console.error('Error registering user:', error);
        }
      );
  }
}

