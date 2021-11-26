package com.IFRSErechim.HorariosAPI.Aluno;

import com.IFRSErechim.HorariosAPI.Disciplina.DisciplinaDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AlunoDTO implements Serializable {
    private Long id;

    @NotEmpty
    @CPF
    private String cpf;

    @NotEmpty
    @Size(min = 2,max = 100)
    private String nomeCompleto;

    private String matricula;

    private Boolean ativo;

    private LocalDate dataInativacao;

    private LocalDate dataInclusao;

    private List<DisciplinaDTO> disciplinas = new ArrayList<>();

    public AlunoDTO (Aluno entity){
        id = entity.getId();
        nomeCompleto = entity.getNomeCompleto();
        matricula = entity.getMatricula();
        ativo = entity.getAtivo();
        dataInativacao = entity.getDataInativacao();
        dataInclusao = entity.getDataInclusao();
        cpf = entity.getCpf();
        disciplinas = entity.getDisciplinas().stream().map(x-> new DisciplinaDTO(x)).collect(Collectors.toList());
    }
}
