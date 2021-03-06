package com.IFRSErechim.HorariosAPI.Disciplina;

import com.IFRSErechim.HorariosAPI.Curso.CursoDTO;
import com.IFRSErechim.HorariosAPI.Professor.ProfessorDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class DisciplinaDTO implements Serializable {
    private Long id;

    @NotEmpty
    @Size(min = 2,max = 100)
    private String nome;

    private List<ProfessorDTO> professores = new ArrayList<>();

    @JsonIgnore
    private List<CursoDTO> cursos = new ArrayList<>();

    private String codMoodle;

    public DisciplinaDTO(Disciplina entity) {
        id = entity.getId();
        nome = entity.getNome();
        professores = entity.getProfessores().stream().map(x -> new ProfessorDTO(x)).collect(Collectors.toList());
        codMoodle = entity.getCodMoodle();
    }

}
