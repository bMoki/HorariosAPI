package com.IFRSErechim.HorariosAPI.Disciplina;

import com.IFRSErechim.HorariosAPI.Professor.ProfessorDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DisciplinaDTO implements Serializable {
    private Long id;

    @NotEmpty
    @Size(min = 2,max = 100)
    private String nome;

    private List<ProfessorDTO> professores = new ArrayList<>();

    public DisciplinaDTO(Disciplina entity) {
        id = entity.getId();
        nome = entity.getNome();
        professores = entity.getProfessores().stream().map(x -> new ProfessorDTO(x)).collect(Collectors.toList());
    }

    public DisciplinaDTO(Long id, String nome) {
        this.id = id;
        this.nome = nome;
    }

    //    @Valid
//    private List<Professor> professores;
}
