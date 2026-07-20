export type TipoTelefone = 'celular' | 'fixo';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  tipoTelefone: TipoTelefone;
}