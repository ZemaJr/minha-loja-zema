import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DbProdutoService } from '../db/db-produto.service';
import { DbUsuarioService } from '../db/db-usuario.service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.scss'],
})
export class CadastroProdutoComponent implements OnInit {
  produtoId = new FormControl('', [Validators.required]);
  produtoNome = new FormControl('', [Validators.required]);
  produtoPreco = new FormControl('', [Validators.required]);
  products: any[] | undefined;

  usuarioId = new FormControl('', [Validators.required]);
  usuarioNome = new FormControl('', [Validators.required]);
  usuarioCPF = new FormControl('', [Validators.required]);
  usuarioEmail = new FormControl('', [Validators.required, Validators.email]);
  usuarioSenha = new FormControl('', [Validators.required]);
  hide = true;
  users: any[] | undefined;
  displayedColumnsUsuarios: string[] = ['ID', 'NOME', 'CPF', 'LOGIN', 'SENHA'];
  displayedColumnsProdutos: string[] = ['ID', 'NOME', 'PREÇO'];
  dataSource = new MatTableDataSource();

  constructor(
    private dbProdutoService: DbProdutoService,
    private dbUsuarioService: DbUsuarioService
  ) {}

  ngOnInit(): void {
    this.dbProdutoService.buscarTodosOsDados().subscribe({
      next: (dados) => {
        this.products = dados;
        this.dataSource = dados;
      },
      error: () => {
        this.dbProdutoService.openDialog(false);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  buscarDados() {
    this.dbProdutoService.buscarDados(this.produtoId.value).subscribe({
      next: (dados) => {
        this.produtoId.setValue(dados.id);
        this.produtoNome.setValue(dados.nome);
        this.produtoPreco.setValue(dados.preco);
      },
      error: () => {
        this.dbProdutoService.openDialog(false);
      },
    });
  }

  salvarDados() {
    if (this.validarDados()) {
      this.dbProdutoService.salvarDados(
        this.produtoId.value,
        this.produtoNome.value,
        this.produtoPreco.value
      );
    }
  }

  alterarDados() {
    if (this.validarDados()) {
      this.dbProdutoService.alterarDados(
        this.produtoId.value,
        this.produtoNome.value,
        this.produtoPreco.value
      );
    }
  }

  excluirDados() {
    if (this.validarDados()) {
      this.dbProdutoService.excluirDados(this.produtoId.value);
    }
  }

  novo() {
    this.produtoId.setValue('');
    this.produtoNome.setValue('');
    this.produtoPreco.setValue('');
  }

  validarDados(): boolean {
    if (this.produtoNome.value == '' || this.produtoPreco.value == '') {
      this.dbUsuarioService.openDialog(false);
      return false;
    }
    return true;
  }
}
