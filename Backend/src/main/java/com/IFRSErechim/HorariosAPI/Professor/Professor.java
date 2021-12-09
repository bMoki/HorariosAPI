package com.IFRSErechim.HorariosAPI.Professor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

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

    public Professor(ProfessorDTO entity) {
        id = entity.getId();
        nome = entity.getNome();
        sobrenome = entity.getSobrenome();
        cpf = entity.getCpf();
        email = entity.getEmail();
        dataNascimento = entity.getDataNascimento();
        SIAPE = entity.getSIAPE();
    }

}
