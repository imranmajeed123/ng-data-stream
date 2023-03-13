import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { CoinBaseState } from 'src/app/store';

import { SnapshotComponent } from './snapshot.component';

describe('SnapshotComponent', () => {
  let component: SnapshotComponent;
  let fixture: ComponentFixture<SnapshotComponent>;
  let store: Store<CoinBaseState>;
 
  store = jasmine.createSpyObj('Store', {
    dispatch: undefined,
    select: of({asks: [], bids: []})
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnapshotComponent ],
      providers: [       
        { provide: Store, useValue: store }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnapshotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
