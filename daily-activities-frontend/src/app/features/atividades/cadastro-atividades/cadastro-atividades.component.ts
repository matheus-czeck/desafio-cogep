import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { AtividadesService } from '../../../services/atividades.service';
import { PessoasService } from '../../../services/pessoas.service';
import { BackButtonComponent } from '../../back-button/back-button.component';

@Component({
  selector: 'app-cadastro-atividades',
  standalone: true,
  imports: [CommonModule, FormsModule, BackButtonComponent], 
  templateUrl: './cadastro-atividades.component.html',
})
export class CadastroAtividadesComponent {
  atividade = { name: '', description: '', startDate: '', endDate: '', creationDate: new Date().toISOString(), personId: null };
  pessoas: any[] = []; 

  constructor(private pessoasService: PessoasService, private atividadesService: AtividadesService) {}

  ngOnInit(): void {
    this.carregarPessoas();
  }

  carregarPessoas(): void {
    this.pessoasService.getPessoas().subscribe({
      next: (res) => {
        this.pessoas = res;
      },
      error: (err) => {
        console.error('Erro ao carregar pessoas:', err);
        alert('Erro ao carregar a lista de pessoas.');
      },
    });
  }

  onSave(): void {
    if (!this.atividade.personId) {
      alert('Por favor, selecione uma pessoa para associar a atividade.');
      return;
    }

    this.atividadesService.addAtividade(this.atividade).subscribe({
      next: () => {
        alert('Atividade cadastrada com sucesso!');
        this.atividade = { name: '', description: '', startDate: '', endDate: '', creationDate: new Date().toISOString(), personId: null };
      },
      error: (err) => {
        console.error('Erro ao cadastrar atividade:', err);
        alert('Erro ao cadastrar atividade.');
      },
    });
  }
}
