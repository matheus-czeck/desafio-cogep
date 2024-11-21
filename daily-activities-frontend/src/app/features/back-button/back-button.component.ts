import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-button',
  standalone: true,
  template: `
    <button (click)="voltar()" class="btn btn-secondary w-100 mt-3">
       Voltar
    </button>
  `,
})
export class BackButtonComponent {
  constructor(private router: Router) {}

  voltar(): void {
    this.router.navigate(['dashboard']); 
  }
}
