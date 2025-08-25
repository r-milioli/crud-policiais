import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoliciaisService, Policial } from '../../services/policiais.service';

@Component({
  selector: 'app-cadastro-policial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro-policial.component.html',
  styleUrls: ['./cadastro-policial.component.css']
})
export class CadastroPolicialComponent {
  policial: Policial = {
    rg_civil: '',
    rg_militar: '',
    cpf: '',
    data_nascimento: '',
    matricula: ''
  };

  carregando = false;
  mensagem = '';
  sucesso = false;

  constructor(private policiaisService: PoliciaisService) {}

  cadastrar() {
    this.carregando = true;
    this.mensagem = '';

    this.policiaisService.cadastrarPolicial(this.policial).subscribe({
      next: (response) => {
        this.sucesso = true;
        this.mensagem = 'Policial cadastrado com sucesso!';
        this.limparFormulario();
        this.carregando = false;
      },
      error: (error) => {
        this.sucesso = false;
        this.mensagem = error.error?.error || 'Erro ao cadastrar policial';
        this.carregando = false;
      }
    });
  }

  limparFormulario() {
    this.policial = {
      rg_civil: '',
      rg_militar: '',
      cpf: '',
      data_nascimento: '',
      matricula: ''
    };
  }
}
