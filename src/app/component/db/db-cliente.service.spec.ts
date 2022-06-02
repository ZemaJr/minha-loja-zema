import { TestBed } from '@angular/core/testing';

import { DbClienteService } from './db-cliente.service';

describe('DbClienteService', () => {
  let service: DbClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
