package com.IFRSErechim.HorariosAPI.Aluno;


import com.IFRSErechim.HorariosAPI.Disciplina.Disciplina;
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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "aluno_disciplina",
            joinColumns = @JoinColumn (name = "aluno_id"),
            inverseJoinColumns = @JoinColumn(name = "disciplina_id")
    )
    private List<Disciplina> disciplinas = new ArrayList<>();

    public Aluno (AlunoDTO entity){
        id = entity.getId();
        nomeCompleto = entity.getNomeCompleto();
        cpf = entity.getCpf();
        matricula = entity.getMatricula();
        ativo = entity.getAtivo();
        dataInativacao = entity.getDataInativacao();
        dataInclusao = entity.getDataInclusao();
        disciplinas = entity.getDisciplinas().stream().map(x->new Disciplina(x)).collect(Collectors.toList());
    }

}
