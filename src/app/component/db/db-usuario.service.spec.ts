import { TestBed } from '@angular/core/testing';
import { DbUsuarioService } from './db-usuario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('DbUsuarioService', () => {
  let service: DbUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
    });
    service = TestBed.inject(DbUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
