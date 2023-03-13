import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { CoinBaseState } from 'src/app/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SnapshotComponent } from '../snapshot/snapshot.component';
import { UpdateComponent } from '../update/update.component';

import { ContainerComponent } from './container.component';

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let mockWebSocketService: WebSocketService;
  let store: Store<CoinBaseState>;

  mockWebSocketService = jasmine.createSpyObj('WebSocketService', {
    connect: of({type:'snapshot'}),
  });

  store = jasmine.createSpyObj('Store', {
    dispatch: undefined,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerComponent],
      providers: [
        { provide: WebSocketService, useValue: mockWebSocketService },
        { provide: Store, useValue: store }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    // store = TestBed.inject(Store);
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should handle snapshot Messages', ()=> {
   
    mockWebSocketService.connect = jasmine.createSpy().and.returnValue(of({type:'snapshot'}));

    fixture.detectChanges();
    
    expect(store.dispatch).toHaveBeenCalled();
    
  });

  it('should handle l2update Messages', ()=> {
   
    mockWebSocketService.connect = jasmine.createSpy().and.returnValue(of({type:'l2update'}));

    fixture.detectChanges();
    
    expect(store.dispatch).toHaveBeenCalled();
    
  });
});
