package com.IFRSErechim.HorariosAPI.Horario;

import com.IFRSErechim.HorariosAPI.Curso.Curso;
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

    @Column(nullable = false)
    private Integer semestre;
    @Column
    private Integer periodo;

    @ManyToOne
    private Curso curso;


    public Horario(HorarioDTO entity) {
        id = entity.getId();
        semestre = entity.getSemestre();
        periodo = entity.getPeriodo();
        curso = entity.getCurso();
    }
}
