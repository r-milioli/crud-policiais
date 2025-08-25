import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoliciaisService, Policial } from '../../services/policiais.service';

@Component({
  selector: 'app-listagem-policiais',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listagem-policiais.component.html',
  styleUrls: ['./listagem-policiais.component.css']
})
export class ListagemPoliciaisComponent implements OnInit {
  policiais: Policial[] = [];
  carregando = false;
  erro = '';
  filtroCPF = '';
  filtroRG = '';

  constructor(private policiaisService: PoliciaisService) {}

  ngOnInit() {
    this.carregarPoliciais();
  }

  carregarPoliciais() {
    this.carregando = true;
    this.erro = '';

    this.policiaisService.listarPoliciais().subscribe({
      next: (data) => {
        this.policiais = data;
        this.carregando = false;
      },
      error: (error) => {
        this.erro = 'Erro ao carregar policiais';
        this.carregando = false;
      }
    });
  }

  aplicarFiltroCPF() {
    if (this.filtroCPF.trim()) {
      this.carregando = true;
      this.erro = '';
      this.policiaisService.buscarPorCPF(this.filtroCPF.trim()).subscribe({
        next: (data) => {
          this.policiais = data;
          this.carregando = false;
        },
        error: (error) => {
          this.erro = 'Erro ao filtrar por CPF';
          this.carregando = false;
        }
      });
    } else {
      this.carregarPoliciais();
    }
  }

  aplicarFiltroRG() {
    if (this.filtroRG.trim()) {
      this.carregando = true;
      this.erro = '';
      this.policiaisService.buscarPorRG(this.filtroRG.trim()).subscribe({
        next: (data) => {
          this.policiais = data;
          this.carregando = false;
        },
        error: (error) => {
          this.erro = 'Erro ao filtrar por RG';
          this.carregando = false;
        }
      });
    } else {
      this.carregarPoliciais();
    }
  }

  limparFiltros() {
    this.filtroCPF = '';
    this.filtroRG = '';
    this.carregarPoliciais();
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
}
