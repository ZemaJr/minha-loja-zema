import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DbUsuarioService } from '../db/db-usuario.service';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss'],
})
export class CadastroUsuarioComponent implements OnInit {
  usuarioId = new FormControl('', [Validators.required]);
  usuarioNome = new FormControl('', [Validators.required]);
  usuarioCPF = new FormControl('', [Validators.required]);
  usuarioEmail = new FormControl('', [Validators.required, Validators.email]);
  usuarioSenha = new FormControl('', [Validators.required]);
  hide = true;
  users: any[] | undefined;
  displayedColumnsUsuarios: string[] = ['ID', 'NOME', 'CPF', 'LOGIN', 'SENHA'];
  dataSource = new MatTableDataSource();

  constructor(private dbUsuarioService: DbUsuarioService) {}

  ngOnInit(): void {
    this.dbUsuarioService.buscarTodosOsDados().subscribe({
      next: (dados) => {
        this.users = dados;
        this.dataSource = dados;
      },
      error: () => {
        this.dbUsuarioService.openDialog(false);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  buscarDados() {
    this.dbUsuarioService.buscarDados(this.usuarioId.value).subscribe({
      next: (dados) => {
        this.usuarioId.setValue(dados.id);
        this.usuarioNome.setValue(dados.nome);
        this.usuarioCPF.setValue(dados.cpf);
        this.usuarioEmail.setValue(dados.login);
        this.usuarioSenha.setValue(dados.senha);
      },
      error: () => {
        this.dbUsuarioService.openDialog(false);
      },
    });
  }

  salvarDados() {
    if (this.validarDados()) {
      this.dbUsuarioService.salvarDados(
        this.usuarioId.value,
        this.usuarioNome.value,
        this.usuarioCPF.value,
        this.usuarioEmail.value,
        this.usuarioSenha.value
      );
    }
  }

  alterarDados() {
    if (this.validarDados()) {
      this.dbUsuarioService.alterarDados(
        this.usuarioId.value,
        this.usuarioNome.value,
        this.usuarioCPF.value,
        this.usuarioEmail.value,
        this.usuarioSenha.value
      );
    }
  }

  excluirDados() {
    if (this.validarDados()) {
      this.dbUsuarioService.excluirDados(this.usuarioId.value);
    }
  }

  novo() {
    this.usuarioId.setValue('');
    this.usuarioNome.setValue('');
    this.usuarioCPF.setValue('');
    this.usuarioEmail.setValue('');
    this.usuarioSenha.setValue('');
  }

  validarDados(): boolean {
    if (
      this.usuarioNome.value == '' ||
      this.usuarioCPF.value == '' ||
      this.usuarioEmail.value == '' ||
      this.usuarioSenha.value == ''
    ) {
      this.dbUsuarioService.openDialog(false);
      return false;
    }
    return true;
  }
}
