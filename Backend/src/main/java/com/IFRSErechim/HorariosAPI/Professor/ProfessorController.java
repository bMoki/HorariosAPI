package com.IFRSErechim.HorariosAPI.Professor;

import com.IFRSErechim.HorariosAPI.Exception.*;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequestMapping("/professor")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ProfessorController {


    @Autowired
    private ProfessorService professorService;

    @GetMapping
    public ResponseEntity<Page<ProfessorDTO>> findAll(@RequestParam(value = "paged", defaultValue = "true", required = false) Boolean paged,
                                                      @PageableDefault(size = 6 ) Pageable pageable){
        if(!paged) pageable = Pageable.unpaged();

        Page<ProfessorDTO> list = professorService.findAll(pageable);
        return ResponseEntity.ok(list);

    }

    @PostMapping("/upload")
    public MessageResponseDTO importProf(@RequestParam("file")MultipartFile file) throws AlreadyExistsException, ParseError, LimitError {
        return professorService.importProfessor(file);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponseDTO criaProfessor(@RequestBody @Valid ProfessorDTO professorDTO) throws AlreadyExistsException {
        return professorService.criaProfessor(professorDTO);
    }

    @GetMapping("/{id}")
    public ProfessorDTO findById(@PathVariable Long id) throws NotFoundException {
        return professorService.findById(id);
    }

    @PutMapping("/{id}")
    public MessageResponseDTO updateById(@PathVariable Long id, @RequestBody @Valid ProfessorDTO professorDTO) throws NotFoundException {
        return professorService.updateById(id, professorDTO);
    }

    @DeleteMapping("/{id}")
    public MessageResponseDTO delete (@PathVariable Long id) throws NotFoundException, DeleteException {
        return professorService.delete(id);
    }
}
