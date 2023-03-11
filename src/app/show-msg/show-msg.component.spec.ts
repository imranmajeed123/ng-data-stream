import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMsgComponent } from './show-msg.component';

describe('ShowMsgComponent', () => {
  let component: ShowMsgComponent;
  let fixture: ComponentFixture<ShowMsgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMsgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
