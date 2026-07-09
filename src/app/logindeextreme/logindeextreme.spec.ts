import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logindeextreme } from './logindeextreme';

describe('Logindeextreme', () => {
  let component: Logindeextreme;
  let fixture: ComponentFixture<Logindeextreme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Logindeextreme],
    }).compileComponents();

    fixture = TestBed.createComponent(Logindeextreme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
