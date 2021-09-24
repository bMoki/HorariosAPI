export type Prof =  {
    id?: number;
    nome?: string;
    sobrenome?: string;
    cpf?: string;
    email?: string;
    dataNascimento?: string;
    siape?: number;
}

export type ProfPage = {
    content?: Prof[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
    size?: number;
    numberOfElements?: number;
    first: boolean;
    empty?: boolean;
}