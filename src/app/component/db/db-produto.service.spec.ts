import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { DbProdutoService } from './db-produto.service';

describe('DbProdutoService', () => {
  let service: DbProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatDialogModule],
    });
    service = TestBed.inject(DbProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
