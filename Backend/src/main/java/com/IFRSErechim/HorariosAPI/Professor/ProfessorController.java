package com.IFRSErechim.HorariosAPI.Professor;

import com.IFRSErechim.HorariosAPI.Exception.ProfessorNotFoundException;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/professor")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ProfessorController {

    @Autowired
    private ProfessorService professorService;

    @GetMapping
    public ResponseEntity<List<ProfessorDTO>> findAll(){
        List<ProfessorDTO> list = professorService.findAll();
        return ResponseEntity.ok(list);

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponseDTO criaProfessor(@RequestBody @Valid ProfessorDTO professorDTO){
        return professorService.criaProfessor(professorDTO);
    }

    @GetMapping("/{id}")
    public ProfessorDTO findById(@PathVariable Long id) throws ProfessorNotFoundException {
        return professorService.findById(id);
    }
}
