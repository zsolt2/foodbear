import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFoodsComponent } from './list-foods.component';

describe('ListFoodsComponent', () => {
  let component: ListFoodsComponent;
  let fixture: ComponentFixture<ListFoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
