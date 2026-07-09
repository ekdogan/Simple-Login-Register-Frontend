import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Headerlayout } from './headerlayout';

describe('Headerlayout', () => {
  let component: Headerlayout;
  let fixture: ComponentFixture<Headerlayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Headerlayout],
    }).compileComponents();

    fixture = TestBed.createComponent(Headerlayout);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
