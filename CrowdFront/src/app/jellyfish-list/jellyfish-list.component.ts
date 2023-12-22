import { Component, OnInit } from '@angular/core';
import { ApiCrowdsourcingService } from '../api-crowdsourcing.service';

@Component({
  selector: 'app-jellyfish-list',
  templateUrl: './jellyfish-list.component.html',
  styleUrls: ['./jellyfish-list.component.css']
})
export class JellyfishListComponent implements OnInit {
  jellyfishDescriptions: string[] = [];

  constructor(private apiService: ApiCrowdsourcingService) {}

  ngOnInit(): void {
    this.fetchJellyfishDescriptions();
  }
// Add these properties to your component class
loading: boolean = true;
error: boolean = false;
errorMessage: string = '';

fetchJellyfishDescriptions(): void {
  this.loading = true;
  this.apiService.getAllJellyfish().subscribe(
    (data: { descricao: string[] }) => {
      console.log('Dados recebid do back',data); // Verifique os dados no console
      this.jellyfishDescriptions = data.descricao;
      this.loading = false;
    },
    (error: any) => {
      console.error('Erro ao obter as descrições das jellyfish:', error.status, error.message);
      this.loading = false;
      this.error = true;
      this.errorMessage = 'Erro ao obter as descrições das jellyfish. Por favor, tente novamente.';
    }
  );
}
}
