import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';


  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password)
      .subscribe(
        (response) => {
          console.log('Resposta do servidor:', response);

          // Adicione aqui a lógica de redirecionamento após o login bem-sucedido.
          this.router.navigate(['/home']);  // Substitua '/home' pela rota desejada

          // Armazene informações de sessão usando o AuthService
          // this.authService.setSession(response);  // Supondo que o serviço tenha um método para definir a sessão
        },
        (error) => {
          console.error('Erro na chamada HTTP:', error);
          // Adicione aqui a lógica de tratamento de erro, se necessário.
        }
      );
  }
}
