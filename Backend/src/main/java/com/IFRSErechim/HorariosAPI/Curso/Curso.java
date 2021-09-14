package com.IFRSErechim.HorariosAPI.Curso;

import com.IFRSErechim.HorariosAPI.Disciplina.Disciplina;
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
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @ManyToMany
    @JoinTable(
            name="curso_disciplina",
            joinColumns = @JoinColumn(name = "curso_id"),
            inverseJoinColumns = @JoinColumn(name = "disciplina_id")
    )
    List<Disciplina> disciplinas = new ArrayList<>();

     public Curso(CursoDTO entity) {
            id = entity.getId();
            nome = entity.getNome();
            disciplinas = entity.getDisciplinas().stream().map(x-> new Disciplina(x)).collect(Collectors.toList());
     }

     public void Disciplinas(Disciplina disciplina) {
            disciplinas.add(disciplina);
     }

}
