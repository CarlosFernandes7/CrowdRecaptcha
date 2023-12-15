import { Component, OnInit } from '@angular/core';
import { ApiCrowdsourcingService } from '../api-crowdsourcing.service';

@Component({
  selector: 'app-jellyfish',
  templateUrl: './jellyfish.component.html',
  styleUrls: ['./jellyfish.component.css'] // Corrigir para "styleUrls"
})
export class JellyfishComponent implements OnInit {
  jellyfishData: any[] = [];

  constructor(private apiCrowdsourcingService: ApiCrowdsourcingService) {}

  ngOnInit() {
    this.apiCrowdsourcingService.getAllJellyfish().subscribe((data) => {
      this.jellyfishData = data;
    });
  }
}
