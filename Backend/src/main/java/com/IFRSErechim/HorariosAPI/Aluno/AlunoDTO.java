package com.IFRSErechim.HorariosAPI.Aluno;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;

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

    @NotEmpty
    private LocalDate dataInclusao;

    public AlunoDTO (Aluno entity){
        id = entity.getId();
        nomeCompleto = entity.getNomeCompleto();
        matricula = entity.getMatricula();
        ativo = entity.getAtivo();
        dataInativacao = entity.getDataInativacao();
        dataInclusao = entity.getDataInclusao();
        cpf = entity.getCpf();
    }
}
