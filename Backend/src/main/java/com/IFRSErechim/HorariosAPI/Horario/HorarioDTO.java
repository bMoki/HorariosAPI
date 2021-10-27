package com.IFRSErechim.HorariosAPI.Horario;

import com.IFRSErechim.HorariosAPI.Disciplina.DisciplinaDTO;
import com.IFRSErechim.HorariosAPI.Professor.ProfessorDTO;
import com.IFRSErechim.HorariosAPI.Turma.TurmaDTO;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HorarioDTO implements Serializable {
    private Long id;

    private Integer periodo;

    private DiaSemana diaSemana;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private TurmaDTO turma;

    private DisciplinaDTO disciplina;

    private ProfessorDTO professor;

    public HorarioDTO(Horario entity) {
        id = entity.getId();
        periodo = entity.getPeriodo();
        diaSemana = entity.getDiaSemana();
        disciplina = new DisciplinaDTO(entity.getDisciplina());
        professor = new ProfessorDTO(entity.getProfessor());

    }
}
