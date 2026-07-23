import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aitable } from './aitable';

describe('Aitable', () => {
  let component: Aitable;
  let fixture: ComponentFixture<Aitable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aitable],
    }).compileComponents();

    fixture = TestBed.createComponent(Aitable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
