import { Component, OnInit } from '@angular/core';
import { dadosFormulario } from '../../modelos/formulario.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {

  novoItem: dadosFormulario = { cidade: '', telefone: '', qtdeQuarto: 1, qtdeBanheiro: 1 };
  resultado:number = 0;

  simular() {
    this.resultado = 100+(this.novoItem.qtdeQuarto * 20)+(this.novoItem.qtdeBanheiro *30)

  }
  solicitarServico() {
    const phone = encodeURIComponent("55"+this.novoItem.telefone);
    const text = encodeURIComponent("Olá, Gostaria de Solicitar a Limpeza de minha casa.");
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${text}`;
    window.open(url, '_blank');
  }

}
