import { TestBed } from '@angular/core/testing';

import { AddresseeService } from './addressee.service';

describe('AddresseeService', () => {
  let service: AddresseeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddresseeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
