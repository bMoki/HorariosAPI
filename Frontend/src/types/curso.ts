import {Disciplina} from './disciplina';
import { Turma } from './turma';


export type Curso = {
    id?:number;
    nome?:string;
    turmas?:Turma[];
    quantidadeTurma?:number;
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
