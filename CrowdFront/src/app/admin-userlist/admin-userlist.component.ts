import { Component, OnInit } from '@angular/core';
import { ApiCrowdsourcingService } from '../api-crowdsourcing.service';

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css']  // Importe seus estilos CSS, se houver
})



export class AdminUserlistComponent {
  searchTerm: string = '';
  searchTermId: string = '';
  // originaluserList: any[] = [];



  utilizadores = {
    id: '',
    nome: '',
    email: '',
    password: '',
    data_registro: '',
    num_respostas_corretas: '',
    num_respostas_erradas: '',
    pagamento: ''
  };

  userList: any[] = [];

  constructor(private ApiCrowdsourcingService: ApiCrowdsourcingService) { }  // Injete o serviço adequado

  ngOnInit() {
    console.log('Initializing AdminUserlistComponent');

    this.carregarUtilizadores();
  }


  filterUsersByName() {
    // Implemente a lógica de filtragem por nome
  }

  filterUsersById() {
    // Implemente a lógica de filtragem por ID
  }

  removeUser(userId: string) {
    this.ApiCrowdsourcingService.removeUser(userId)
      .subscribe(
        () => {
          console.log('User removed successfully');
          // Optionally, update the user list after removal
          this.carregarUtilizadores();
        },
        error => {
          console.error('Error removing user:', error);
        }
      );
  }



  carregarUtilizadores() {
    this.ApiCrowdsourcingService.getAllUsers()
      .subscribe(
        userList => {
          console.log('Lista de utilizadores:', userList);
          this.userList = userList;

          // this.originaluserList = userList;
          // this.filterUserList(); // Chama a filtragem inicial
        },
        error => {
          console.error('Erro ao obter a lista de utilizadores:', error);
        }
      );
  }

  registerUser(){
    
  }
}
