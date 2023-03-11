import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebSocketService } from './services/web-socket.service';
import { UpdateComponent } from './components/update/update.component';
import { ContainerComponent } from './components/container/container.component';
import { DataService } from './services/data.service';
import { SnapshotComponent } from './components/snapshot/snapshot.component';

@NgModule({
  declarations: [
    AppComponent,    
    SnapshotComponent,
    UpdateComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
    
  ],
  providers: [WebSocketService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
