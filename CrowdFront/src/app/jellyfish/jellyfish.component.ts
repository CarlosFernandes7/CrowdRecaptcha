import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-jellyfish',
  templateUrl: './jellyfish.component.html',
  styleUrls: ['./jellyfish.component.css']
})
export class JellyfishComponent implements OnInit, OnDestroy {

  backendData: any;
  unknownJellyfishData: any; // New property for unknown jellyfish data
  private ngUnsubscribe = new Subject<void>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
    this.fetchUnknownJellyfishData(); // Call the new method
  }

  fetchData() {
    this.http.get('http://localhost:3000/jellyfish')
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data) => {
          this.backendData = data;
          console.log('Dados do backend:', this.backendData);
        },
        (error) => {
          console.error('Erro ao obter dados do backend:', error);
        }
      );
  }

  fetchUnknownJellyfishData() {
    this.http.get('http://localhost:3000/jellyfishunknown') // Adjust the endpoint accordingly
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (data) => {
          this.unknownJellyfishData = data;
          console.log('Dados do backend (Jellyfish Unknown):', this.unknownJellyfishData);
        },
        (error) => {
          console.error('Erro ao obter dados do backend (Jellyfish Unknown):', error);
        }
      );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getImagemUrl(nomeImagem: string): string {
    return `/assets/JellyFishConhecidos/${nomeImagem}`;
  }

  getImagemUrlDesconhecidos(nomeImagem: string): string {
    return `/assets/JellyFishDesconhecidos/${nomeImagem}`;
  }
}
