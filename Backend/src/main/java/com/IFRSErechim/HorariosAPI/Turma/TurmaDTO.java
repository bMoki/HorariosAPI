package com.IFRSErechim.HorariosAPI.Turma;

import com.IFRSErechim.HorariosAPI.Curso.Curso;
import com.IFRSErechim.HorariosAPI.Curso.CursoDTO;
import com.IFRSErechim.HorariosAPI.Horario.HorarioDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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


@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class TurmaDTO implements Serializable {

    private Long id;

    @NotEmpty
    @Size(min = 2,max = 50)
    private String nome;

    @JsonIgnore
    private CursoDTO curso;

    @Size(max = 10)
    private List<HorarioDTO> horarios = new ArrayList<>();

    public TurmaDTO (Turma entity){
        id = entity.getId();
        nome = entity.getNome();
        horarios = entity.getHorarios().stream().map(x -> new HorarioDTO(x)).collect(Collectors.toList());

    }

}
