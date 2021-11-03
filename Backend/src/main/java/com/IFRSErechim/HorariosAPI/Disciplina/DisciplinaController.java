package com.IFRSErechim.HorariosAPI.Disciplina;

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
@RequestMapping("/disciplina")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class DisciplinaController {
    @Autowired
    private DisciplinaService disciplinaService;

    @GetMapping
    public ResponseEntity<Page<DisciplinaDTO>>  findAll(@RequestParam(value = "paged", defaultValue = "true", required = false) Boolean paged,
                                                        @PageableDefault(size = 12 ) Pageable pageable){
        if(!paged) pageable = Pageable.unpaged();

        Page<DisciplinaDTO> list = disciplinaService.findAll(pageable);
        return ResponseEntity.ok(list);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponseDTO criaDisciplina(@RequestBody @Valid DisciplinaDTO disciplinaDTO) throws AlreadyExistsException {
        return disciplinaService.criaDisciplina(disciplinaDTO);
    }

//    @PutMapping("/{disciplinaId}/professor/{professorId}")
//    public MessageResponseDTO atribuiProfessorParaDisciplina(
//            @PathVariable Long disciplinaId,
//            @PathVariable Long professorId
//    ) throws DisciplinaNotFoundException, ProfessorNotFoundException {
//        return  disciplinaService.atribuiProfessorParaDisciplina(disciplinaId,professorId);
//    }

    @GetMapping("/{id}")
    public DisciplinaDTO findById(@PathVariable Long id) throws NotFoundException {
        return disciplinaService.findById(id);
    }
    @PutMapping("/{id}")
    public MessageResponseDTO updateById(@PathVariable Long id, @RequestBody @Valid DisciplinaDTO disciplinaDTO) throws NotFoundException{
        return disciplinaService.UpdateById(id, disciplinaDTO);
    }

    @DeleteMapping("/{id}")
    public MessageResponseDTO delete (@PathVariable Long id) throws NotFoundException, DeleteException {
        return disciplinaService.delete(id);
    }

}
