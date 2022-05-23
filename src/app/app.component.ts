import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  title = 'minha-loja';

  ngOnInit(): void {
    if (this.getStatusLogin() != 'Logado') {
      this.router.navigate(['/login']);
    }
  }

  setStatusLogin(statusLogin: string): void {
    localStorage.setItem('Status-Login', statusLogin);
  }

  getStatusLogin(): string | null {
    return localStorage.getItem('Status-Login');
  }
}
