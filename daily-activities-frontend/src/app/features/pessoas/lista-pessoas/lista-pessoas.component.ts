import { Component, OnInit } from '@angular/core';
import { PessoasService } from '../../../services/pessoas.service';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../back-button/back-button.component';

@Component({
  selector: 'app-lista-pessoas',
  standalone: true,
  imports: [CommonModule, BackButtonComponent],
  templateUrl: './lista-pessoas.component.html',
})
export class ListaPessoasComponent implements OnInit {
  pessoas: any[] = []; 
  pessoaSelecionada: any = null; 
  atividades: any[] = []; 

  constructor(private pessoasService: PessoasService) {}

  ngOnInit(): void {
    
    this.pessoasService.getPessoas().subscribe({
      next: (res) => {
        this.pessoas = res;
      },
      error: (err) => {
        console.error('Erro ao carregar pessoas:', err);
      },
    });
  }

  onSelecionarPessoa(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value; 
    const personId = parseInt(selectedValue, 10);
  
    if (!isNaN(personId)) {
      
      this.pessoasService.getPessoaById(personId).subscribe({
        next: (res) => {
          this.pessoaSelecionada = res;
          this.atividades = res.atividades || [];
        },
        error: (err) => {
          console.error('Erro ao carregar detalhes da pessoa:', err);
        },
      });
    }
  }
  }