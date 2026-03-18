import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentsList } from './apartments-list';

describe('ApartmentsList', () => {
  let component: ApartmentsList;
  let fixture: ComponentFixture<ApartmentsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartmentsList],
    }).compileComponents();

    fixture = TestBed.createComponent(ApartmentsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
