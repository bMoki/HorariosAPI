package com.IFRSErechim.HorariosAPI.Disciplina;

import com.IFRSErechim.HorariosAPI.Curso.Curso;
import com.IFRSErechim.HorariosAPI.Professor.Professor;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Disciplina {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nome;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name="professor_disciplina",
            joinColumns = @JoinColumn(name = "disciplina_id"),
            inverseJoinColumns = @JoinColumn(name = "professor_id")
    )
    private List<Professor> professores = new ArrayList<>();

//    @JsonIgnore
//    @ManyToMany(fetch = FetchType.LAZY , mappedBy = "disciplinas")
//    private  List<Curso> cursos = new ArrayList<>();

    @Column
    private Long codMoodle;

    public Disciplina(DisciplinaDTO entity) {
        id = entity.getId();
        nome = entity.getNome();
        professores = entity.getProfessores().stream().map(x-> new Professor(x)).collect(Collectors.toList());
        codMoodle = entity.getCodMoodle();
    }
}
