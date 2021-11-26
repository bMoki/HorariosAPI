package com.IFRSErechim.HorariosAPI.Horario;

import com.IFRSErechim.HorariosAPI.Disciplina.DisciplinaDTO;
import com.IFRSErechim.HorariosAPI.Professor.ProfessorDTO;
import com.IFRSErechim.HorariosAPI.Turma.TurmaDTO;
import com.IFRSErechim.HorariosAPI.Turma.TurmaID;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class FilterHorarioDTO {
    private Long id;

    private Integer periodo;

    private DiaSemana diaSemana;

    private TurmaID turma;

    private DisciplinaDTO disciplina;

    private ProfessorDTO professor;

    public FilterHorarioDTO(Horario entity) {
        id = entity.getId();
        periodo = entity.getPeriodo();
        diaSemana = entity.getDiaSemana();
        disciplina = new DisciplinaDTO(entity.getDisciplina());
        professor = new ProfessorDTO(entity.getProfessor());
        turma = new TurmaID(entity.getTurma());

    }
}
