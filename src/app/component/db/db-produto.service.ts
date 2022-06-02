import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { DialogoErroComponent } from '../dialogo-erro/dialogo-erro.component';

@Injectable({
  providedIn: 'root',
})
export class DbProdutoService {
  url = 'http://localhost:3000/produto';

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  buscarTodosOsDados(): Observable<any> {
    return this.http.get(this.url);
  }

  buscarDados(id: number): Observable<any> {
    return this.http.get(this.url + '/' + id);
  }

  salvarDados(id: number, nome: string, preco: number): void {
    this.http
      .post(this.url, {
        id: id,
        nome: nome,
        preco: preco,
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

  alterarDados(id: number, nome: string, preco: number): void {
    this.http
      .put(this.url + '/' + id, {
        id: id,
        nome: nome,
        preco: preco,
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
          document.location.reload();
        });
    } else {
      this.dialog.open(DialogoErroComponent);
    }
  }
}
