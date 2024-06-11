export interface dadosFormulario {
  nome:string,
  email:string;
  logradouro:string,
  numero:number,
  cidade:string,
  estado:string,
  telefone:string,
  qtdeQuarto: number,
  qtdeBanheiro: number,
  data:string,
  valor:number
}

export interface ClienteModel {
  nome: string;
  email:string;
  logradouro: string;
  numero: number;
  cidade: string;
  estado: string;
  telefone: string;
}

export interface OrdemServicoDTO {
  cliente: ClienteModel;
  numeroQuartos: number;
  numeroBanheiros: number;
  dataAtendimento: string; // Se o backend espera uma string no formato "dd/MM/yyyy"
  valor: number; // Se precisar ser BigDecimal, pode ser tratado no backend
}
