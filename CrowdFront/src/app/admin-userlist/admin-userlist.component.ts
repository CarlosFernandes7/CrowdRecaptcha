import { Component, OnInit } from '@angular/core';
import { ApiCrowdsourcingService } from '../api-crowdsourcing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-userlist',
  templateUrl: './admin-userlist.component.html',
  styleUrls: ['./admin-userlist.component.css']  // Importe seus estilos CSS, se houver
})



export class AdminUserlistComponent {
  searchTerm: string = '';
  searchTermId: string = '';
  searchTermEmail: string = '';

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

  constructor(private ApiCrowdsourcingService: ApiCrowdsourcingService, private router: Router) { }  // Injete o serviço adequado

  ngOnInit() {
    console.log('Initializing AdminUserlistComponent');

    this.carregarUtilizadores();
  }


  filterUsersByName() {
    if (this.searchTerm.trim() === '') {
      // If the search term is empty, reset the user list to the original list
      this.carregarUtilizadores();
    } else {
      // Filter users by name using a case-insensitive search
      this.userList = this.userList.filter(user =>
        user.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  
  // filterUsersById() {
  //   if (this.searchTerm.trim() === '') {
  //     // If the search term is empty, reset the user list to the original list
  //     this.carregarUtilizadores();
  //   } else {
  //     // Filter users by name using a case-insensitive search
  //     this.userList = this.userList.filter(user =>
  //       user.id.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //   }
  // }

   
  // filterUsersByEmail() {
  //   if (this.searchTerm.trim() === '') {
  //     // If the search term is empty, reset the user list to the original list
  //     this.carregarUtilizadores();
  //   } else {
  //     // Filter users by name using a case-insensitive search
  //     this.userList = this.userList.filter(user =>
  //       user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
  //     );
  //   }
  // }



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

  redirectToRegister() {
    this.router.navigate(['/admin/register']);
}
}
