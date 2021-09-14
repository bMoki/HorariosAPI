package com.IFRSErechim.HorariosAPI.Disciplina;

import com.IFRSErechim.HorariosAPI.Exception.DeleteException;
import com.IFRSErechim.HorariosAPI.Exception.DisciplinaNotFoundException;
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
@RequestMapping("/disciplina")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class DisciplinaController {
    @Autowired
    private DisciplinaService disciplinaService;

    @GetMapping
    public ResponseEntity<List<DisciplinaDTO>> findAll(){
        List<DisciplinaDTO> list = disciplinaService.findAll();
        return ResponseEntity.ok(list);

    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponseDTO criaDisciplina(@RequestBody @Valid DisciplinaDTO disciplinaDTO){
        return disciplinaService.criaDisciplina(disciplinaDTO);
    }

    @PutMapping("/{disciplinaId}/professor/{professorId}")
    public MessageResponseDTO atribuiProfessorParaDisciplina(
            @PathVariable Long disciplinaId,
            @PathVariable Long professorId
    ) throws DisciplinaNotFoundException, ProfessorNotFoundException {
        return  disciplinaService.atribuiProfessorParaDisciplina(disciplinaId,professorId);
    }

    @GetMapping("/{id}")
    public DisciplinaDTO findById(@PathVariable Long id) throws DisciplinaNotFoundException {
        return disciplinaService.findById(id);
    }
    @PutMapping("/{id}")
    public MessageResponseDTO updateById(@PathVariable Long id, @RequestBody @Valid DisciplinaDTO disciplinaDTO) throws DisciplinaNotFoundException{
        return disciplinaService.UpdateById(id, disciplinaDTO);
    }

    @DeleteMapping("/{id}")
        public MessageResponseDTO delete (@PathVariable Long id) throws DisciplinaNotFoundException, DeleteException {
            return disciplinaService.delete(id);
        }

}
