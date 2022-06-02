import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroProdutoComponent } from './cadastro-produto.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('CadastroProdutoComponent', () => {
  let component: CadastroProdutoComponent;
  let fixture: ComponentFixture<CadastroProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroProdutoComponent],
      imports: [HttpClientTestingModule, MatDialogModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
