import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListByDateComponent } from './list-by-date.component';

describe('ListByDateComponent', () => {
  let component: ListByDateComponent;
  let fixture: ComponentFixture<ListByDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListByDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
