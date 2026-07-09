import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevxDemoDrawer } from './devx-demo-drawer';

describe('DevxDemoDrawer', () => {
  let component: DevxDemoDrawer;
  let fixture: ComponentFixture<DevxDemoDrawer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevxDemoDrawer],
    }).compileComponents();

    fixture = TestBed.createComponent(DevxDemoDrawer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
