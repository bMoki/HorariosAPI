package com.IFRSErechim.HorariosAPI.Curso;

import com.IFRSErechim.HorariosAPI.Disciplina.DisciplinaDTO;
import com.IFRSErechim.HorariosAPI.Turma.Turma;
import com.IFRSErechim.HorariosAPI.Turma.TurmaDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Min;
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

    @Min(1)
    private Integer quantidadeTurma;

    private List<DisciplinaDTO> disciplinas = new ArrayList<>();

    private List<TurmaDTO> turmas = new ArrayList<>();



    public CursoDTO(Curso entity) {
        id = entity.getId();
        nome = entity.getNome();
        quantidadeTurma = entity.getQuantidadeTurma();
        disciplinas = entity.getDisciplinas().stream().map(x -> new DisciplinaDTO(x)).collect(Collectors.toList());
        turmas = entity.getTurmas().stream().map(x -> new TurmaDTO(x)).collect(Collectors.toList());
    }
}

