export interface Pergunta {
  pergunta: string;
  motivo: string;
}

export interface Perguntas {
  altamente_provavel: Pergunta[];
  podem_perguntar: Pergunta[];
  por_precaucao: Pergunta[];
}

export interface Analise {
  id: string;
  url: string;
  titulo_vaga: string | null;
  empresa: string | null;
  perguntas: Perguntas;
  created_at: string;
}

export interface VagaData {
  titulo: string;
  empresa: string;
  descricao: string;
  requisitos: string;
}

export interface AnalisarVagaResponse {
  id: string;
  perguntas: Perguntas;
}

export interface ErrorResponse {
  error: string;
}
