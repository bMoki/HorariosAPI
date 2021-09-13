package com.IFRSErechim.HorariosAPI.Professor;

import com.IFRSErechim.HorariosAPI.Disciplina.DisciplinaDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;

import javax.validation.constraints.Email;
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
public class ProfessorDTO implements Serializable {
    private Long id;

    @NotEmpty
    @Size(min = 2,max = 100)
    private String nome;

    @NotEmpty
    @Size(min = 2,max = 100)
    private String sobrenome;

    @NotEmpty
    @CPF
    private String cpf;

    @NotEmpty
    @Email
    private String email;

    private LocalDate dataNascimento;

    private String SIAPE;

    @JsonIgnore
    private List<DisciplinaDTO> disciplinas = new ArrayList<>();



    public ProfessorDTO(Professor entity) {
        id = entity.getId();
        nome = entity.getNome();
        sobrenome = entity.getSobrenome();
        cpf = entity.getCpf();
        email = entity.getEmail();
        dataNascimento = entity.getDataNascimento();
        SIAPE = entity.getSIAPE();
        //disciplinas = entity.getDisciplinas().stream().map(x -> new DisciplinaDTO(x)).collect(Collectors.toList());

    }
//    @Valid
//    private List<Disciplina> Disciplinas;


}
