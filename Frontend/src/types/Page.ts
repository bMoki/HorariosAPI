import { Aluno } from "./aluno";
import { Curso } from "./curso";
import { Disciplina } from "./disciplina";
import { Prof } from "./prof";

export type Page = {
    content?: Prof[] | Disciplina[] | Curso[] | Aluno[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
    size?: number;
    numberOfElements?: number;
    first: boolean;
    empty?: boolean;
}