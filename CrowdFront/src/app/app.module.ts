// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';  // Adicione esta linha
import { JellyfishComponent } from './jellyfish/jellyfish.component';
import { ApiCrowdsourcingService } from './api-crowdsourcing.service';
import { HttpClientModule } from '@angular/common/http';
import { JellyfishRoutingModule } from './jellyfish/jellyfish-routing.module';
// import { OrderByPipe } from './orderBy.pipe';
// import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    JellyfishComponent,
    // OrderByPipe,
    // FilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,  
    HttpClientModule,
    JellyfishRoutingModule,
  ],
  providers: [ApiCrowdsourcingService],
  bootstrap: [AppComponent]
})
export class AppModule { }