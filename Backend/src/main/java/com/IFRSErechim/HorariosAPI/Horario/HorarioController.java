package com.IFRSErechim.HorariosAPI.Horario;

import com.IFRSErechim.HorariosAPI.Exception.DeleteException;
import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/horario")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class HorarioController {

    @Autowired
    private HorarioService horarioService;

    @GetMapping
    public ResponseEntity<List<HorarioDTO>> findAll(){
        List<HorarioDTO> list = horarioService.findAll();
        return ResponseEntity.ok(list);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponseDTO criaHorario(@RequestBody @Valid HorarioDTO horarioDTO){
        return horarioService.criaHorario(horarioDTO);
    }

    @GetMapping("/{id}")
    public HorarioDTO findById(@PathVariable Long id) throws NotFoundException {
        return horarioService.findById(id);
    }
    @PutMapping("/{id}")
    public MessageResponseDTO updateById(@PathVariable Long id, @RequestBody @Valid HorarioDTO horarioDTO) throws NotFoundException{
        return horarioService.UpdateById(id, horarioDTO);
    }

    @DeleteMapping("/{id}")
    public MessageResponseDTO delete (@PathVariable Long id) throws NotFoundException, DeleteException {
        return horarioService.delete(id);
    }
}
