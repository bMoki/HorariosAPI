package com.IFRSErechim.HorariosAPI.Curso;

import com.IFRSErechim.HorariosAPI.Disciplina.DisciplinaDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
public class CursoDTO implements Serializable {
    private Long id;

    @NotEmpty
    @Size(min = 2,max = 50)
    private String nome;

    private List<DisciplinaDTO> disciplinas = new ArrayList<>();

    public CursoDTO(Curso entity) {
        id = entity.getId();
        nome = entity.getNome();
        disciplinas = entity.getDisciplinas().stream().map(x -> new DisciplinaDTO(x)).collect(Collectors.toList());
    }
}
