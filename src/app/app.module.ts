import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebSocketService } from './services/web-socket.service';
import { UpdateComponent } from './components/update/update.component';
import { ContainerComponent } from './components/container/container.component';
import { DataService } from './services/data.service';
import { SnapshotComponent } from './components/snapshot/snapshot.component';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,    
    SnapshotComponent,
    UpdateComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    TableModule
    
  ],
  providers: [WebSocketService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
