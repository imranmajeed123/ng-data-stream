import { CommonModule } from '@angular/common';
import { NgModule, isDevMode } from '@angular/core';
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
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { coinBaseReducer } from './reducers';

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
    TableModule,
    StoreModule.forRoot({ coinBase: coinBaseReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
    
  ],
  providers: [WebSocketService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
