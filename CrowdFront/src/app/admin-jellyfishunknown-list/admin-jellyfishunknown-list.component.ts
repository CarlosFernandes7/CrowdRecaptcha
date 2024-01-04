import { Component } from '@angular/core';
import { ApiCrowdsourcingService } from '../api-crowdsourcing.service';

@Component({
  selector: 'app-admin-jellyfishunknown-list',
  templateUrl: './admin-jellyfishunknown-list.component.html',
  styleUrl: './admin-jellyfishunknown-list.component.css'
})
export class AdminJellyfishunknownListComponent {

  searchTerm: string = '';
  searchTermId: string = '';

  jellyfishunknown = {
    id: '',
    nome_imagem: '',
  };



  originalJellyfishUnknownList: any[] = [];
  jellyfishUnknownList: any[] = [];

  constructor(private apiCrowdsourcingService: ApiCrowdsourcingService) { }

  ngOnInit() {
    this.carregarJellyfish();
  }

  carregarJellyfish() {
    this.apiCrowdsourcingService.getJellyfishUnknownList()
      .subscribe(
        jellyfishUnknownList => {
          console.log('Lista de Jellyfish Desconhecidos:', jellyfishUnknownList);
          this.originalJellyfishUnknownList = jellyfishUnknownList;
        },
        error => {
          console.error('Erro ao obter a lista de Jellyfish:', error);
        }
      );
  }




  handleImageError(jellyfishunknown: any): void {
    console.error(`Failed to load image for Jellyfish with ID ${jellyfishunknown.id}`);
  }
}
