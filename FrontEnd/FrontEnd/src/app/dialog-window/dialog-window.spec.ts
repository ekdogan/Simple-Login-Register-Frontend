import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWindow } from './dialog-window';

describe('DialogWindow', () => {
  let component: DialogWindow;
  let fixture: ComponentFixture<DialogWindow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogWindow],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogWindow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
