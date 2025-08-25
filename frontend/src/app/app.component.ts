import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroPolicialComponent } from './components/cadastro-policial/cadastro-policial.component';
import { ListagemPoliciaisComponent } from './components/listagem-policiais/listagem-policiais.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CadastroPolicialComponent, ListagemPoliciaisComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CRUD Policiais';
}
