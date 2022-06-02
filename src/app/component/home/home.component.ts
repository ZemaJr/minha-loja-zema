import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DbUsuarioService } from '../db/db-usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DbUsuarioService],
})
export class HomeComponent implements OnInit {
  hide: boolean = true;
  id = new FormControl();
  nome = new FormControl();
  cpf = new FormControl();
  email = new FormControl('', [Validators.required, Validators.email]);
  senhaCriada = new FormControl('', [Validators.required]);
  senhaConfirmada = new FormControl('', [Validators.required]);

  constructor(private dbUsuarioService: DbUsuarioService) {}

  ngOnInit(): void {}

  buscarDados() {
    this.dbUsuarioService.buscarDados(this.id.value).subscribe({
      next: (data) => {
        this.id.setValue(data.id);
        this.nome.setValue(data.nome);
        this.cpf.setValue(data.cpf);
        this.email.setValue(data.login);
        this.senhaCriada.setValue(data.senha);
        this.senhaConfirmada.setValue(data.senha);
      },
      error: () => {},
    });
  }

  salvarDados() {
    this.dbUsuarioService.salvarDados(
      this.id.value,
      this.nome.value,
      this.cpf.value,
      this.email.value,
      this.senhaConfirmada.value
    );
  }

  editarDados() {
    this.dbUsuarioService.alterarDados(
      this.id.value,
      this.nome.value,
      this.cpf.value,
      this.email.value,
      this.senhaConfirmada.value
    );
  }

  excluirDados() {
    this.dbUsuarioService.excluirDados(this.id.value);
  }

  novo() {
    this.id.setValue(undefined);
    this.nome.setValue(undefined);
    this.cpf.setValue(undefined);
    this.email.setValue(undefined);
    this.senhaCriada.setValue(undefined);
    this.senhaConfirmada.setValue(undefined);
  }
}
