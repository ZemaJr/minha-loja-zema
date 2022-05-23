import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { DialogoErroComponent } from '../dialogo-erro/dialogo-erro.component';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  url = 'http://localhost:3000/usuario';
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  buscarDados(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  buscarTodosOsDados(): Observable<any> {
    return this.http.get(this.url);
  }

  login(): Observable<any> {
    return this.http.get(this.url);
  }

  salvarDados(
    id: number,
    nome: string,
    cpf: number,
    email: string,
    senhaConfirmada: string
  ): void {
    this.http
      .post(this.url, {
        id: id,
        nome: nome,
        cpf: cpf,
        login: email,
        senha: senhaConfirmada,
      })
      .subscribe({
        next: () => {
          this.openDialog(true);
        },
        error: () => {
          this.openDialog(false);
        },
      });
  }

  alterarDados(
    id: number,
    nome: string,
    cpf: number,
    email: string,
    senhaConfirmada: string
  ): void {
    this.http
      .put(this.url + '/' + id, {
        id: id,
        nome: nome,
        cpf: cpf,
        login: email,
        senha: senhaConfirmada,
      })
      .subscribe({
        next: () => {
          this.openDialog(true);
        },
        error: () => {
          this.openDialog(false);
        },
      });
  }

  excluirDados(id: number): void {
    this.http.delete(this.url + '/' + id).subscribe({
      next: () => {
        this.openDialog(true);
      },
      error: () => {
        this.openDialog(false);
      },
    });
  }

  openDialog(sucesso: boolean) {
    if (sucesso) {
      this.dialog
        .open(DialogoComponent)
        .afterClosed()
        .subscribe(() => {
          window.location.reload();
        });
    } else {
      this.dialog.open(DialogoErroComponent);
    }
  }
}
