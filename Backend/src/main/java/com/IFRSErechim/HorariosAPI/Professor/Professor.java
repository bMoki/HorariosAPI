package com.IFRSErechim.HorariosAPI.Professor;

import com.IFRSErechim.HorariosAPI.Disciplina.Disciplina;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Professor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String sobrenome;

    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(nullable = false)
    private String email;

    @Column
    private LocalDate dataNascimento;

    @Column
    private String SIAPE;

    @JsonIgnore
    @ManyToMany(mappedBy = "professores")
    private List<Disciplina> disciplinas = new ArrayList<>();

    public Professor(ProfessorDTO entity) {
        id = entity.getId();
        nome = entity.getNome();
        sobrenome = entity.getSobrenome();
        cpf = entity.getCpf();
        email = entity.getEmail();
        dataNascimento = entity.getDataNascimento();
        SIAPE = entity.getSIAPE();
        //disciplinas = entity.getDisciplinas().stream().map(x->new Disciplina(x)).collect(Collectors.toList());
    }
}
