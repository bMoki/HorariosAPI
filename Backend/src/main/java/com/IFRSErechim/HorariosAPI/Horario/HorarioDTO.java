package com.IFRSErechim.HorariosAPI.Horario;

import com.IFRSErechim.HorariosAPI.Curso.Curso;
import com.IFRSErechim.HorariosAPI.Disciplina.Disciplina;
import com.IFRSErechim.HorariosAPI.Professor.Professor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HorarioDTO implements Serializable {
    private Long id;

    private Integer semestre;

    private Integer periodo;

    @OneToMany
    private Curso curso;

    @OneToMany
    private Disciplina disciplina;

    @OneToMany
    private Professor professor;

    public HorarioDTO(Horario entity) {
        id = entity.getId();
        semestre = entity.getSemestre();
        periodo = entity.getPeriodo();
        curso = entity.getCurso();
        disciplina = entity.getDisciplina();
        professor = entity.getProfessor();
    }
}
