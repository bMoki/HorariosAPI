import { Curso } from "./curso"
import { Prof } from "./prof"
import { Disciplina } from "./disciplina"

export type Horario = {
    id?:number;
    periodo?:number,
    diaSemana?:string,
    disciplina?:Disciplina|null;
    professor?:Prof|null;
}
