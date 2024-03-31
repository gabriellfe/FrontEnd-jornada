export interface Promocao {
    id: number
    destino: string
    imagem: string
    preco: number
}

export interface UnidadeFederativa {
    id: number;
    nome: string;
    sigla: string;
}

export interface Depoimento {
    id: number;
    texto: string;
    autor: string;
    avatar: string;
}

export interface PessoaUsuaria {
  nome: string;
  nascimento: string;
  cpf: string;
  telefone: string;
  email: string;
  senha: string;
  cidade: string;
  estado: UnidadeFederativa;
  genero: string;
}

export interface EditaPessoaUsuaria {
    nome: string;
    nascimento: string;
    cpf: string;
    telefone: string;
    email: string;
    cidade: string;
    estado: UnidadeFederativa;
    genero: string;
  }

export interface CadastroUser {
    nome: string;
    nascimento: string;
    cpf: string;
    telefone: string;
    email: string;
    senha: string;
    cidade: string;
    estado: UnidadeFederativa;
    genero: string;
  }

export interface jwtClient {
    EXP: number;
    client: string;
}

export interface responseLogin {
    token: string,
    message: string;
}