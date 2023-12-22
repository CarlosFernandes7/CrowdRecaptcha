import { Component, OnInit } from '@angular/core';
import { ApiCrowdsourcingService } from '../api-crowdsourcing.service';

interface Jellyfish {
  id: number;
  nome: string;
  descricao: string;
}

@Component({
  selector: 'app-jellyfish-list',
  templateUrl: './jellyfish-list.component.html',
  styleUrls: ['./jellyfish-list.component.css']
})
export class JellyfishListComponent implements OnInit {
  jellyfishDescriptions: Jellyfish[] = [];
  filteredJellyfish: Jellyfish[] = [];
  loading: boolean = true;
  error: boolean = false;
  errorMessage: string = '';
  searchTerm: string = '';

  constructor(private apiService: ApiCrowdsourcingService) {}

  ngOnInit(): void {
    this.fetchJellyfishDescriptions();
  }

  fetchJellyfishDescriptions(): void {
    this.apiService.getAllJellyfish().subscribe(
      (data: Jellyfish[]) => {
        this.jellyfishDescriptions = data;
        this.filteredJellyfish = [...this.jellyfishDescriptions];
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

  filterJellyfish(): void {
    // Filter jellyfish based on the search term
    this.filteredJellyfish = this.jellyfishDescriptions.filter(jellyfish =>
      jellyfish.nome.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  showDetails(jellyfish: Jellyfish): void {
    const urlFromDescription = jellyfish.descricao;
    if (urlFromDescription) {
      window.open(urlFromDescription, '_blank');
    }
  }
}
