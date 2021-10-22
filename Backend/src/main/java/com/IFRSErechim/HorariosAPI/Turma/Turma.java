package com.IFRSErechim.HorariosAPI.Turma;


import com.IFRSErechim.HorariosAPI.Curso.Curso;
import com.IFRSErechim.HorariosAPI.Horario.Horario;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Turma {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @ManyToOne(fetch = FetchType.LAZY)
    private Curso curso;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Horario> horarios = new ArrayList<>();

    public Turma(TurmaDTO entity){
        id = entity.getId();
        nome = entity.getNome();
        curso = new Curso(entity.getCurso());
        horarios = entity.getHorarios().stream().map(x -> new Horario(x)).collect(Collectors.toList());
    }


}
