import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierTableComponent } from './courier-table.component';

describe('CourierTableComponent', () => {
  let component: CourierTableComponent;
  let fixture: ComponentFixture<CourierTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
