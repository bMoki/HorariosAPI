import { Horario } from "./horario";

export type Turma = {
    id: number;
    nome: string;
    horarios: Horario[];
}