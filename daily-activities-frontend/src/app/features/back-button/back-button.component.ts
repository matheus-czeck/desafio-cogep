import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  template: `
    <button (click)="voltar()" class="btn btn-secondary">
      ← Voltar
    </button>
  `,
  styles: [
    `
      button {
        margin: 10px 0;
        font-size: 16px;
        padding: 8px 12px;
        cursor: pointer;
      }
    `,
  ],
})
export class BackButtonComponent {
  constructor(private router: Router) {}

  voltar(): void {
    this.router.navigate(['dashboard']); 
  }
}
