import {Prof} from 'types/prof';

export type Disciplina = {
    id?:number;
    nome?:string;
    professores?:Prof[];
    codMoodle?:number;
}

export type DisciplinaPage = {
    content?: Disciplina[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
    size?: number;
    numberOfElements?: number;
    first: boolean;
    empty?: boolean;
}
