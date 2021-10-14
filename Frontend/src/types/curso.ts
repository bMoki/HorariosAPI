import {Disciplina} from 'types/disciplina';

export type Curso = {
    id?:number;
    nome?:string;
    disciplinas?:Disciplina[];
}

export type CursoPage = {
    content?: Curso[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
    size?: number;
    numberOfElements?: number;
    first: boolean;
    empty?: boolean;
}
