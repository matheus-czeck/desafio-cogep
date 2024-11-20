import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PessoasService } from '../../../services/pessoas.service';
import { BackButtonComponent } from '../../back-button/back-button.component';

@Component({
  selector: 'app-cadastro-pessoas',
  standalone: true,
  imports: [FormsModule, BackButtonComponent],
  templateUrl: './cadastro-pessoas.component.html',
})
export class CadastroPessoasComponent {
  pessoa = { name: '', phone: '', email: '', address: { street: '', number: '', complement: '', city: '' } };

  constructor(private pessoasService: PessoasService) {}

  onSave(): void {

    console.log('Dados enviados pelo frontend:', this.pessoa);

    this.pessoasService.addPessoa(this.pessoa).subscribe({
      next: () => {
        alert('Pessoa cadastrada com sucesso!');
        this.pessoa = { name: '', phone: '', email: '', address: { street: '', number: '', complement: '', city: '' } };
      },
      error: (err) => {
        console.error('Erro ao cadastrar pessoa:', err);
        alert('Erro ao cadastrar pessoa: ' + err.error.message);
      },
    });
  }
}
