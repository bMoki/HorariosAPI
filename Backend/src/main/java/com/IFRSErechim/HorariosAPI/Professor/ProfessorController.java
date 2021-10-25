package com.IFRSErechim.HorariosAPI.Professor;

import com.IFRSErechim.HorariosAPI.Exception.DeleteException;
import com.IFRSErechim.HorariosAPI.Exception.AlreadyExistsException;
import com.IFRSErechim.HorariosAPI.Exception.ProfessorNotFoundException;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/professor")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @GetMapping
    public ResponseEntity<Page<ProfessorDTO>> findAll(@RequestParam(value = "paged", defaultValue = "true", required = false) Boolean paged,Pageable pageable){
        if(!paged) pageable = Pageable.unpaged();

        Page<ProfessorDTO> list = professorService.findAll(pageable);
        return ResponseEntity.ok(list);

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponseDTO criaProfessor(@RequestBody @Valid ProfessorDTO professorDTO) throws AlreadyExistsException {
        return professorService.criaProfessor(professorDTO);
    }

    @GetMapping("/{id}")
    public ProfessorDTO findById(@PathVariable Long id) throws ProfessorNotFoundException {
        return professorService.findById(id);
    }

    @PutMapping("/{id}")
    public MessageResponseDTO updateById(@PathVariable Long id, @RequestBody @Valid ProfessorDTO professorDTO) throws ProfessorNotFoundException {
        return professorService.updateById(id, professorDTO);
    }

    @DeleteMapping("/{id}")
    public MessageResponseDTO delete (@PathVariable Long id) throws ProfessorNotFoundException, DeleteException {
        return professorService.delete(id);
    }
}
