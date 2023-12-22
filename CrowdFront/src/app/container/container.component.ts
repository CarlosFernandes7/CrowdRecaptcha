import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { JellyfishComponent } from '../jellyfish/jellyfish.component';
import { JellyfishConhecidoComponent } from '../jellyfish-conhecido/jellyfish-conhecido.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements AfterViewInit {
  @ViewChild(JellyfishComponent) jellyfishComponent!: JellyfishComponent;
  @ViewChild(JellyfishConhecidoComponent) jellyfishConhecidoComponent!: JellyfishConhecidoComponent;

  conhecidoData: any[] = [];  // Certifique-se de que a propriedade existe
  
  ngAfterViewInit(): void {
    // Neste ponto, os ViewChilds estão inicializados
  }

  avancarParaProximasImagens() {
    // Certifique-se de que os métodos são chamados somente após a inicialização dos componentes
    if (this.jellyfishComponent && this.jellyfishConhecidoComponent) {
      this.jellyfishComponent.mostrarProximaJellyfishDesconhecido();
      this.jellyfishConhecidoComponent.mostrarProximaMedusa();
    }
  }
}
