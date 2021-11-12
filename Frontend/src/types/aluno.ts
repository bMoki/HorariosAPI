export type Aluno = {
    id?: number;
    nomeCompleto?: string;
    cpf?: string;
    dataInativacao?: string;
    dataInclusao?: string;
    matricula?: string;
    ativo?:boolean;
}

export type AlunoPage = {
    content?: Aluno[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
    size?: number;
    numberOfElements?: number;
    first: boolean;
    empty?: boolean;
}