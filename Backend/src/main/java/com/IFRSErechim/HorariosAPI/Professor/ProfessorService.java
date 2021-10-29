package com.IFRSErechim.HorariosAPI.Professor;

import com.IFRSErechim.HorariosAPI.Exception.DeleteException;
import com.IFRSErechim.HorariosAPI.Exception.AlreadyExistsException;
import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Transactional(readOnly = true)
    public Page<ProfessorDTO> findAll(Pageable pageable){
        Page<Professor> result = professorRepository.findAll(pageable);
        return result.map(x -> new ProfessorDTO(x));
    }

    public MessageResponseDTO criaProfessor (ProfessorDTO professorDTO) throws AlreadyExistsException {

        if(professorRepository.findByCpf(professorDTO.getCpf()) > 0){
            throw new AlreadyExistsException("CPF já cadastrado!");
        }

        Professor salvarProfessor = new Professor(professorDTO);
        Professor ProfessorSalvo = professorRepository.save(salvarProfessor);
        return criaMessageResponse("Professor "+ProfessorSalvo.getNome()+" "+ProfessorSalvo.getSobrenome()+" cadastrado!");
    }
    public ProfessorDTO findById(Long id) throws NotFoundException {
        Professor professor = verifyIfExistsById(id);
        ProfessorDTO professorDTO = new ProfessorDTO(professor);

        return professorDTO;
    }

    public MessageResponseDTO updateById(Long id, ProfessorDTO professorDTO) throws NotFoundException {

        verifyIfExistsById(id);
        Professor professorToUpdate = new Professor(professorDTO);

        Professor updatedProfessor = professorRepository.save(professorToUpdate);
        return criaMessageResponse("Professor "+updatedProfessor.getNome()+" "+updatedProfessor.getSobrenome()+" atualizado!");
    }

    public MessageResponseDTO delete(Long id) throws NotFoundException, DeleteException {
        Professor professorToDelete = verifyIfExistsById(id);
        if(professorRepository.ProfessorHasReference(id) > 0){
            throw new DeleteException(id,"Professor");
        }

        professorRepository.deleteById(id);
        return criaMessageResponse("Professor "+professorToDelete.getNome()+" "+professorToDelete.getSobrenome()+ " deletado!");
    }

    private Professor verifyIfExistsById(Long id) throws NotFoundException {
        return professorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Professor"));
    }

    private MessageResponseDTO criaMessageResponse(String message) {
        return MessageResponseDTO
                .builder()
                .message(message)
                .build();
    }
}
