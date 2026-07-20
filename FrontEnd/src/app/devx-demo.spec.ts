import { TestBed } from '@angular/core/testing';

import { DevxDemo } from './devx-demo';

describe('DevxDemo', () => {
  let service: DevxDemo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevxDemo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
