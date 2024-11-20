import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  constructor(private router: Router) {}

  goToCadastroPessoas(): void {
    this.router.navigate(['/cadastro-pessoas']);
  }

  goToCadastroAtividades(): void {
    this.router.navigate(['/cadastro-atividades']);
  }
  goToListaPessoas(): void {
    this.router.navigate(['/lista-pessoas']);
  }
  
}
