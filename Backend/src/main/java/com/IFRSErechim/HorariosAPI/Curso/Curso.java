package com.IFRSErechim.HorariosAPI.Curso;

import com.IFRSErechim.HorariosAPI.Disciplina.Disciplina;
import com.IFRSErechim.HorariosAPI.Turma.Turma;
import com.IFRSErechim.HorariosAPI.Turma.TurmaDTO;
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

    @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Turma> turmas = new ArrayList<>();

    @Column(nullable = false,unique = true)
    private String nome;

    @Column
    private Integer quantidadeTurma;

    @ManyToMany
    @JoinTable(
            name="curso_disciplina",
            joinColumns = @JoinColumn(name = "curso_id"),
            inverseJoinColumns = @JoinColumn(name = "disciplina_id")
    )
    private List<Disciplina> disciplinas = new ArrayList<>();


    public void addTurma(Turma turma){
        turmas.add(turma);
        turma.setCurso(this);
    }
    public void removeTurma(Turma turma){
        turmas.remove(turma);
        turma.setCurso(null);
    }
    public Curso(CursoDTO entity) {
            id = entity.getId();
            nome = entity.getNome();
            quantidadeTurma = entity.getQuantidadeTurma();
            disciplinas = entity.getDisciplinas().stream().map(x-> new Disciplina(x)).collect(Collectors.toList());
            turmas = entity.getTurmas().stream().map(x -> new Turma(x)).collect(Collectors.toList());
     }

     public void Disciplinas(Disciplina disciplina) {
            disciplinas.add(disciplina);
     }

}
