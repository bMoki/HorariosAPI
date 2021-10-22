package com.IFRSErechim.HorariosAPI.Turma;

import com.IFRSErechim.HorariosAPI.Disciplina.DisciplinaDTO;
import com.IFRSErechim.HorariosAPI.Exception.DisciplinaNotFoundException;
import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
import com.IFRSErechim.HorariosAPI.Horario.HorarioDTO;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/turma")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TurmaController {
    @Autowired
    private TurmaService turmaService;

    @PutMapping("/{id}")
    public MessageResponseDTO addHorarioTurma(@PathVariable Long id, @RequestBody @Valid HorarioDTO horarioDTO) throws NotFoundException {
        return turmaService.AddHorarioTurma(id,horarioDTO);
    }
}
