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

  aplicarFiltro() {
    if (this.filtroCPF) {
      this.policiaisService.buscarPorCPF(this.filtroCPF).subscribe({
        next: (data) => this.policiais = data,
        error: (error) => this.erro = 'Erro ao filtrar por CPF'
      });
    } else if (this.filtroRG) {
      this.policiaisService.buscarPorRG(this.filtroRG).subscribe({
        next: (data) => this.policiais = data,
        error: (error) => this.erro = 'Erro ao filtrar por RG'
      });
    } else {
      this.carregarPoliciais();
    }
  }

  formatarData(data: string): string {
    return new Date(data).toLocaleDateString('pt-BR');
  }
}
