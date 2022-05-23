import { Component, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbService } from '../db/db.service';
import { AppComponent } from './../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [DbService],
})
export class LoginComponent implements OnInit {
  siteKey: string = '6LfWp9AeAAAAAEEmzdE7HE6UNYnPqq11ApIHh99c';
  captcha: string | undefined = undefined;
  usuarioLogin = new FormControl('', [Validators.required, Validators.email]);
  usuarioCPF = new FormControl('', [
    Validators.required,
    Validators.maxLength(11),
    Validators.minLength(11),
  ]);
  usuarioSenha = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  hide = true;
  mostrarEmail = '';
  mostrarCPF = 'none';
  corFundoEmail = 'orangered';
  corEmail = 'black';
  corFundoCPF = '';
  corCPF = '';
  fontBoldEmail = 'bold';
  fontBoldCPF = '';
  statusLogin: string = '';
  textoBotao: string = 'Entrar';
  statusBotao: string = 'true';

  constructor(
    private dbService: DbService,
    private router: Router,
    private appComponent: AppComponent
  ) {
    this.captcha = undefined;
  }

  ngOnInit(): void {}

  verEmail(): void {
    this.usuarioCPF.setValue(undefined);
    this.usuarioSenha.setValue(undefined);
    if (this.mostrarEmail === 'none') {
      this.mostrarEmail = '';
      this.corFundoEmail = 'orangered';
      this.corEmail = 'black';
      this.fontBoldEmail = 'bold';
      this.mostrarCPF = 'none';
      this.corFundoCPF = '';
      this.corCPF = '';
      this.fontBoldCPF = '';
    }
  }

  verCPF(): void {
    this.usuarioLogin.setValue(undefined);
    this.usuarioSenha.setValue(undefined);
    if (this.mostrarCPF === 'none') {
      this.mostrarCPF = '';
      this.corFundoCPF = 'orangered';
      this.corCPF = 'black';
      this.fontBoldCPF = 'bold';
      this.mostrarEmail = 'none';
      this.corFundoEmail = '';
      this.corEmail = '';
      this.fontBoldEmail = '';
    }
  }

  resolved(captchaResponse: string) {
    this.statusBotao = 'true';
    this.captcha = captchaResponse;
    if (this.captcha != '') {
      this.statusBotao = 'false';
    }
  }

  enviar(): void {
    if (this.captcha == undefined || this.captcha == '') {
      this.captcha = '';
    } else {
      this.statusLogin = '';
      this.textoBotao = 'Conectando...';
      this.dbService.login().subscribe({
        next: (respostaLogin) => {
          for (let i in respostaLogin) {
            if (
              (this.usuarioLogin.value === respostaLogin[i].login ||
                this.usuarioCPF.value === respostaLogin[i].cpf) &&
              this.usuarioSenha.value === respostaLogin[i].senha
            ) {
              this.statusLogin = 'Logado';
              this.appComponent.setStatusLogin(this.statusLogin);
              this.router.navigate(['/home']);
              break;
            } else {
              this.erro();
            }
          }
        },
        error: () => {
          this.erro();
        },
      });
    }
  }

  erro(): void {
    this.statusLogin = 'Erro';
    this.textoBotao = 'Entrar';
    this.router.navigate(['/login']);
  }

  autenticado(): string {
    return this.statusLogin;
  }
}
