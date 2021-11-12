package com.IFRSErechim.HorariosAPI.Aluno;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Aluno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nomeCompleto;

    @Column(nullable = false, unique = true)
    private String cpf;

    @Column
    private String matricula;

    @Column
    private Boolean ativo;

    @Column
    private LocalDate dataInativacao;

    @Column
    private LocalDate dataInclusao;

    public Aluno (AlunoDTO entity){
        id = entity.getId();
        nomeCompleto = entity.getNomeCompleto();
        cpf = entity.getCpf();
        matricula = entity.getMatricula();
        ativo = entity.getAtivo();
        dataInativacao = entity.getDataInativacao();
        dataInclusao = entity.getDataInclusao();
    }

}
