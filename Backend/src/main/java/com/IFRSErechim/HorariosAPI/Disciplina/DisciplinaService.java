package com.IFRSErechim.HorariosAPI.Disciplina;

import com.IFRSErechim.HorariosAPI.Exception.AlreadyExistsException;
import com.IFRSErechim.HorariosAPI.Exception.DeleteException;
import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
import com.IFRSErechim.HorariosAPI.Professor.ProfessorService;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class DisciplinaService {

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    private ProfessorService professorService;

    public Page<DisciplinaDTO> findAll(Pageable pageable){
        Page<Disciplina> result = disciplinaRepository.findAll(pageable);
        return result.map(x -> new DisciplinaDTO(x));
    }


    public MessageResponseDTO criaDisciplina (DisciplinaDTO disciplinaDTO) throws AlreadyExistsException{
        if(disciplinaRepository.findByNome(disciplinaDTO.getNome()) > 0){
                    throw new AlreadyExistsException("Disciplina já cadastrada!");
                }
        Disciplina salvarDisciplina = new Disciplina(disciplinaDTO);

        Disciplina DisciplinaSalva = disciplinaRepository.save(salvarDisciplina);
        return criaMessageResponse("Disciplina " +DisciplinaSalva.getNome()+ " cadastrada!");
    }

    public MessageResponseDTO UpdateById(Long id,DisciplinaDTO disciplinaDTO) throws NotFoundException {
        verifyIfExists(id);

        Disciplina disciplinaToUpdate = new Disciplina(disciplinaDTO);

        Disciplina updatedDisciplina = disciplinaRepository.save(disciplinaToUpdate);
        return criaMessageResponse("Disciplina " +updatedDisciplina.getNome()+ " atualizada!");
    }

    public DisciplinaDTO findById(Long id) throws NotFoundException {
        Disciplina disciplina = verifyIfExists(id);
        DisciplinaDTO disciplinaDTO = new DisciplinaDTO(disciplina);

        return disciplinaDTO;
    }

      public MessageResponseDTO delete(Long id) throws NotFoundException, DeleteException {
            Disciplina disciplinaToDelete = verifyIfExists(id);
            if(disciplinaRepository.DisciplinaHasReference(id) > 0){
                throw new DeleteException("Disciplina");
            }

            disciplinaRepository.deleteById(id);
            return criaMessageResponse("Disciplina "+ disciplinaToDelete.getNome()+ " deletada!");
        }


    private Disciplina verifyIfExists(Long id) throws NotFoundException {
        return disciplinaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Disciplina"));
    }

    private MessageResponseDTO criaMessageResponse(String message) {
        return MessageResponseDTO
                .builder()
                .message(message)
                .build();
    }
}
