package com.IFRSErechim.HorariosAPI.Horario;

import com.IFRSErechim.HorariosAPI.Disciplina.Disciplina;
import com.IFRSErechim.HorariosAPI.Professor.Professor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Horario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @Column(nullable = false)
//    private Integer semestre;

    @Column
    private Integer periodo;

    @Column
    private DiaSemana diaSemana;

//    @ManyToOne
//    private Curso curso;

    @ManyToOne
    private Disciplina disciplina;

    @ManyToOne
    private Professor professor;


    public Horario(HorarioDTO entity) {
        id = entity.getId();
        //semestre = entity.getSemestre();
        periodo = entity.getPeriodo();
        diaSemana = entity.getDiaSemana();
        //curso = entity.getCurso();
        disciplina = entity.getDisciplina();
        professor = entity.getProfessor();
    }
}
