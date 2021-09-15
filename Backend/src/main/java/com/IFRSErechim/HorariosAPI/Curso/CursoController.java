package com.IFRSErechim.HorariosAPI.Curso;

import com.IFRSErechim.HorariosAPI.Exception.DeleteException;
import com.IFRSErechim.HorariosAPI.Exception.DisciplinaNotFoundException;
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
@RequestMapping("/curso")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @GetMapping
    public ResponseEntity<List<CursoDTO>> findAll(){
        List<CursoDTO> list = cursoService.findAll();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public CursoDTO findById(@PathVariable Long id) throws NotFoundException {
            return cursoService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponseDTO criaCurso(@RequestBody @Valid CursoDTO cursoDTO){
        return cursoService.criaCurso(cursoDTO);
    }

    @PutMapping("/{id}")
    public MessageResponseDTO updateById(@PathVariable Long id, @RequestBody @Valid CursoDTO cursoDTO) throws NotFoundException{
        return cursoService.UpdateById(id, cursoDTO);
    }

    @PutMapping("/{cursoId}/disciplina/{disciplinaId}")
    public MessageResponseDTO atribuiDisciplinaParaCurso(
            @PathVariable Long cursoId,
            @PathVariable Long disciplinaId
    ) throws DisciplinaNotFoundException, NotFoundException {
        return  cursoService.atribuiDisciplinaParaCurso(cursoId,disciplinaId);
    }

    @DeleteMapping("/{id}")
    public MessageResponseDTO delete (@PathVariable Long id) throws NotFoundException, DeleteException {
        return cursoService.delete(id);
    }


}