package com.IFRSErechim.HorariosAPI.Turma;

import com.IFRSErechim.HorariosAPI.Curso.CursoID;
import com.IFRSErechim.HorariosAPI.Horario.FilterHorarioDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class FilterTurmaDTO {
    private Long id;

    @NotEmpty
    @Size(min = 2,max = 50)
    private String nome;

    private CursoID curso;

    @Size(max = 10)
    private List<FilterHorarioDTO> horarios = new ArrayList<>();

    public FilterTurmaDTO(Turma entity){
        id = entity.getId();
        nome = entity.getNome();
        horarios = entity.getHorarios().stream().map(x -> new FilterHorarioDTO(x)).collect(Collectors.toList());
        curso = new CursoID(entity.getCurso());

    }

}
