import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCouriersComponent } from './list-couriers.component';

describe('ListCouriersComponent', () => {
  let component: ListCouriersComponent;
  let fixture: ComponentFixture<ListCouriersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCouriersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCouriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
