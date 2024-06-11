import { Component, Injectable, OnInit } from '@angular/core';
import { OrdemServicoDTO, dadosFormulario } from '../../modelos/formulario.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class FormularioComponent {
  isVisible:boolean=false;

  atendimento: dadosFormulario = { nome:'',
    email:'',
    logradouro:'',
    numero:0,
    cidade:'',
    estado:'',
    telefone:'',
    qtdeQuarto: 1,
    qtdeBanheiro: 1,
    data:'',
    valor:0};
  resultado:number = 0;

  private url:string = 'http://localhost:8080/ordemServico';

  constructor(private http:HttpClient) { }

  simular() {
    switch(true){
      case (this.atendimento.nome.length == 0):
        window.alert('Informe o Nome');
        break;
      case (this.atendimento.email.length == 0):
        window.alert('Informe o Email');
        break;
      case (this.atendimento.logradouro.length == 0):
        window.alert('Informe o Logradouro');
        break;
      case (this.atendimento.cidade.length == 0):
        window.alert('Informe a Cidade');
        break;
      case (this.atendimento.estado.length == 0):
        window.alert('Informe o Estado');
        break;
      default:
        this.resultado = 100+(this.atendimento.qtdeQuarto * 20)+(this.atendimento.qtdeBanheiro *30)
        this.atendimento.valor = this.resultado;
        this.isVisible = true;
        break;
    }
  }
  solicitarServico(obj:dadosFormulario) {
    //console.log("teste");
    if (this.atendimento.data.length > 0){
      const ordemServicoDTO = this.mapDadosFormularioToOrdemServicoDTO(obj);
      this.http.post(this.url,ordemServicoDTO).subscribe(response => {console.log('Retorno:',response)});
      this.atendimento.nome ='';
      this.atendimento.email='';
      this.atendimento.logradouro='';
      this.atendimento.numero=0;
      this.atendimento.cidade='';
      this.atendimento.estado='';
      this.atendimento.telefone='';
      this.atendimento.qtdeQuarto= 1;
      this.atendimento.qtdeBanheiro= 1;
      this.atendimento.data='';
      this.atendimento.valor=0;
      this.isVisible = false;

      window.alert('Seu pedido foi Realizado');

    }else{
      window.alert('Informe uma data valida');
    }
  }

  mapDadosFormularioToOrdemServicoDTO(dados: dadosFormulario): OrdemServicoDTO {
    const dataFormatada = this.formatarData(dados.data);
    return {
      cliente: {
        nome: dados.nome,
        email: dados.email,
        logradouro: dados.logradouro,
        numero: dados.numero,
        cidade: dados.cidade,
        estado: dados.estado,
        telefone: dados.telefone
      },
      numeroQuartos: dados.qtdeQuarto,
      numeroBanheiros: dados.qtdeBanheiro,
      dataAtendimento: dataFormatada, // Assumindo que o formato da data está correto
      valor: dados.valor
    };
  }

  formatarData(data:string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

}
