import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWindowAdd } from './dialog-window-add';

describe('DialogWindowAdd', () => {
  let component: DialogWindowAdd;
  let fixture: ComponentFixture<DialogWindowAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogWindowAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogWindowAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
