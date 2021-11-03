import { Curso } from "./curso";
import { Disciplina } from "./disciplina";
import { Prof } from "./prof";

export type Page = {
    content?: Prof[] | Disciplina[] | Curso[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    number: number;
    size?: number;
    numberOfElements?: number;
    first: boolean;
    empty?: boolean;
}