import { Component } from '@angular/core';
import { ApiCrowdsourcingService } from '../api-crowdsourcing.service';
import { AlertService } from '../alert.service';


@Component({
  selector: 'app-admin-newjelly',
  templateUrl: './admin-newjelly.component.html',
  styleUrl: './admin-newjelly.component.css'
})
export class AdminNewjellyComponent {
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

  showAddFormFlag: boolean = false;

  showAddForm() {
      this.showAddFormFlag = true;
      // this.showJellyfishList = false;
      // Pode adicionar lógica adicional se necessário
  }

  selectedSection: 'add' | 'list' = 'add'; // Define a seção inicial como 'add'

  showSection(section: 'add' | 'list') {
      this.selectedSection = section;
  }
}
