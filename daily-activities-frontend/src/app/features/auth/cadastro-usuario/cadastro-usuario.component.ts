import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cadastro-usuario',
  standalone: true,
  imports: [FormsModule, RouterModule], 
  templateUrl: './cadastro-usuario.component.html',
})
export class CadastroUsuarioComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService) {} 

  onRegister(): void {
    const user = { email: this.email, password: this.password };
    this.authService.register(user).subscribe({
      next: () => {
        alert('Usuário cadastrado com sucesso!');
      },
      error: (err) => {
        console.error('Erro ao cadastrar usuário:', err);
        alert(err.error.message || 'Erro ao cadastrar usuário.');
      },
    });
  }
}
