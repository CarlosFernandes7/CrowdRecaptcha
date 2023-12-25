// admin.component.ts

import { Component } from '@angular/core';
import { ApiCrowdsourcingService } from '../api-crowdsourcing.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})


export class AdminComponent {
  jellyfish = {
    nome: '',
    descricao: '',
    nome_imagem: ''
  };

  constructor(private apiCrowdsourcingService: ApiCrowdsourcingService, private alertService: AlertService) {}

  isNomeEditable = true;
  message: string = '';
  alertMessage: string = "";
  errorMessage: string = "";

 

  onSubmit() {
    if (!this.isValidForm()) {
      this.message = 'Por favor, preencha todos os campos.';
      return;
    }

    this.apiCrowdsourcingService.addJellyfish(this.jellyfish)
      .subscribe(
        response => {
          console.log('API Response:', response);
          this.resetForm();
          this.alertMessage = `Jellyfish carregado com sucesso!`;
          setTimeout(() => {
            window.location.href = 'http://localhost:4200/admin';
          }, 2000);
        },
        error => {
          console.error('API Error:', error);
          this.alertMessage = `Erro ao carregar o Jellyfish. Tente novamente mais tarde.`;
        }
      );
  }

  resetForm() {
    this.jellyfish = {
      nome: '',
      descricao: '',
      nome_imagem: '',
    };
    this.isNomeEditable = true;
    this.message = '';
  }

  isValidForm(): boolean {
    return this.jellyfish.nome.trim() !== '' && this.jellyfish.descricao.trim() !== '';
  }

  handleImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.jellyfish.nome_imagem = file.name;
      this.disableNomeEditing();
    }
  }

  disableNomeEditing() {
    this.isNomeEditable = false;
  }

  jellyfishList: any[] = []; // Adiciona esta linha para armazenar a lista de jellyfish

  showJellyfishList: boolean = false;

  openJellyfishList() {
      this.apiCrowdsourcingService.getJellyfishList()
          .subscribe(
              jellyfishList => {
                  console.log('Lista de Jellyfish:', jellyfishList);
                  this.jellyfishList = jellyfishList;
                  this.showJellyfishList = true; // Mostra a lista
              },
              error => {
                  console.error('Erro ao obter a lista de Jellyfish:', error);
              }
          );
  }

  closeJellyfishList() {
      this.showJellyfishList = false; // Fecha a lista
  }

  showAddFormFlag: boolean = false;

  showAddForm() {
      this.showAddFormFlag = true;
      this.showJellyfishList = false;
      // Pode adicionar lógica adicional se necessário
  }


}
