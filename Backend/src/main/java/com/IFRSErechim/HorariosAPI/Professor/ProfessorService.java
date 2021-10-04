package com.IFRSErechim.HorariosAPI.Professor;

import com.IFRSErechim.HorariosAPI.Exception.DeleteException;
import com.IFRSErechim.HorariosAPI.Exception.ProfessorNotFoundException;
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

    public MessageResponseDTO criaProfessor (ProfessorDTO professorDTO) {

        Professor salvarProfessor = new Professor(professorDTO);

        Professor ProfessorSalvo = professorRepository.save(salvarProfessor);
        return criaMessageResponse(ProfessorSalvo.getId(), "Professor criado com ID ");
    }
    public ProfessorDTO findById(Long id) throws ProfessorNotFoundException {
        Professor professor = verifyIfExists(id);
        ProfessorDTO professorDTO = new ProfessorDTO(professor);

        return professorDTO;
    }

    public MessageResponseDTO updateById(Long id, ProfessorDTO professorDTO) throws ProfessorNotFoundException {

        verifyIfExists(id);
        Professor professorToUpdate = new Professor(professorDTO);

        Professor updatedProfessor = professorRepository.save(professorToUpdate);
        return criaMessageResponse(updatedProfessor.getId(), "Professor atualizado com ID ");
    }

    public MessageResponseDTO delete(Long id) throws ProfessorNotFoundException, DeleteException {
        verifyIfExists(id);
        if(professorRepository.ProfessorHasReference(id) > 0){
            throw new DeleteException(id,"Professor");
        }

        professorRepository.deleteById(id);
        return criaMessageResponse(id,"Professor excluido com ID ");
    }

    private Professor verifyIfExists(Long id) throws ProfessorNotFoundException {
        return professorRepository.findById(id)
                .orElseThrow(() -> new ProfessorNotFoundException(id));
    }

    private MessageResponseDTO criaMessageResponse(Long id, String message) {
        return MessageResponseDTO
                .builder()
                .message(message + id)
                .build();
    }
}
