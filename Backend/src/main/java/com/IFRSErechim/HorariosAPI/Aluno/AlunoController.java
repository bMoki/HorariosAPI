package com.IFRSErechim.HorariosAPI.Aluno;

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
@RequestMapping("/aluno")
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @GetMapping
    public ResponseEntity<Page<AlunoDTO>> findAll(@RequestParam(value = "paged", defaultValue = "true", required = false) Boolean paged,
                                                  @PageableDefault(size = 6 )Pageable pageable){
        if(!paged) pageable = Pageable.unpaged();

        Page<AlunoDTO> list = alunoService.findAll(pageable);
        return ResponseEntity.ok(list);
    }

    @PostMapping("/upload")
    public MessageResponseDTO importAluno(@RequestParam("file") MultipartFile file) throws ParseError, WrongCollumnsException {
        return alunoService.importAluno(file);
    }

    @GetMapping("/{id}")
    public AlunoDTO findById(@PathVariable Long id) throws NotFoundException {
            return alunoService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MessageResponseDTO criaAluno(@RequestBody @Valid AlunoDTO alunoDTO) throws AlreadyExistsException {
        return alunoService.criaAluno(alunoDTO);
    }

    @PutMapping("/{id}")
    public MessageResponseDTO updateById(@PathVariable Long id, @RequestBody @Valid AlunoDTO alunoDTO) throws NotFoundException{
        return alunoService.UpdateById(id, alunoDTO);
    }

    @DeleteMapping("/{id}")
    public MessageResponseDTO delete (@PathVariable Long id) throws NotFoundException, DeleteException {
        return alunoService.delete(id);
    }


}
