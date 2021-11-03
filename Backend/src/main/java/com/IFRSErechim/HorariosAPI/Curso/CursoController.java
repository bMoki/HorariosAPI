package com.IFRSErechim.HorariosAPI.Curso;

import com.IFRSErechim.HorariosAPI.Exception.AlreadyExistsException;
import com.IFRSErechim.HorariosAPI.Exception.DeleteException;
import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/curso")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @GetMapping
    public ResponseEntity<Page<CursoDTO>> findAll(@RequestParam(value = "paged", defaultValue = "true", required = false) Boolean paged,
                                                  @PageableDefault(size = 12 )Pageable pageable){
        if(!paged) pageable = Pageable.unpaged();

        Page<CursoDTO> list = cursoService.findAll(pageable);
        return ResponseEntity.ok(list);
    }

    @GetMapping("/{id}")
    public CursoDTO findByIdOrderByPeriodoDiaSemana(@PathVariable Long id) throws NotFoundException {
            return cursoService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponseDTO criaCurso(@RequestBody @Valid CursoDTO cursoDTO) throws AlreadyExistsException {
        return cursoService.criaCurso(cursoDTO);
    }

    @PutMapping("/{id}")
    public MessageResponseDTO updateById(@PathVariable Long id, @RequestBody @Valid CursoDTO cursoDTO) throws NotFoundException{
        return cursoService.UpdateById(id, cursoDTO);
    }

    @DeleteMapping("/{id}")
    public MessageResponseDTO delete (@PathVariable Long id) throws NotFoundException, DeleteException {
        return cursoService.delete(id);
    }


}
