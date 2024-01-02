// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private authToken: string = ''; // Pode ser um token JWT
  private apiUrl = 'http://localhost:3000'; // Substitua pela URL correta da sua API

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };

    // Supondo que a autenticação seja bem-sucedida
    this.isAuthenticated = true;
    this.authToken = 'yourAuthToken'; // Substitua com o token real obtido do servidor

    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  logout() {
    // Implemente a lógica de logout aqui
    // Normalmente, você limparia a autenticação, removeria o token e executaria outras ações necessárias
    this.isAuthenticated = false;
    this.authToken = '';
  }

   // Método para verificar se o usuário está autenticado
   isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
