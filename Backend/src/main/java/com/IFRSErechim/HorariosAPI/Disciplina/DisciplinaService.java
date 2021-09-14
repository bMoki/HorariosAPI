package com.IFRSErechim.HorariosAPI.Disciplina;

import com.IFRSErechim.HorariosAPI.Exception.DeleteException;
import com.IFRSErechim.HorariosAPI.Exception.DisciplinaNotFoundException;
import com.IFRSErechim.HorariosAPI.Exception.ProfessorNotFoundException;
import com.IFRSErechim.HorariosAPI.Professor.Professor;
import com.IFRSErechim.HorariosAPI.Professor.ProfessorDTO;
import com.IFRSErechim.HorariosAPI.Professor.ProfessorService;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class DisciplinaService {

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    private ProfessorService professorService;

    public List<DisciplinaDTO> findAll(){
        List<Disciplina> result = disciplinaRepository.findAll();
        return result.stream().map(x -> new DisciplinaDTO(x)).collect(Collectors.toList());
    }

    public MessageResponseDTO criaDisciplina (DisciplinaDTO disciplinaDTO) {

        Disciplina salvarDisciplina = new Disciplina(disciplinaDTO);

        Disciplina DisciplinaSalva = disciplinaRepository.save(salvarDisciplina);
        return criaMessageResponse(DisciplinaSalva.getId(), "Disciplina criada com ID ");
    }

    public MessageResponseDTO atribuiProfessorParaDisciplina (Long disciplinaId, Long profesorId) throws DisciplinaNotFoundException, ProfessorNotFoundException {
        ProfessorDTO professorDTO = professorService.findById(profesorId);
        Professor professor = new Professor(professorDTO);

        DisciplinaDTO disciplinaDTO = findById(disciplinaId);
        Disciplina disciplina = new Disciplina(disciplinaDTO);
        disciplina.Professores(professor);

        Disciplina DisciplinaSalva = disciplinaRepository.save(disciplina);

        return criaMessageResponse(DisciplinaSalva.getId(), "Disciplina criada com ID ");
    }
    public MessageResponseDTO UpdateById(Long id,DisciplinaDTO disciplinaDTO) throws DisciplinaNotFoundException{
        verifyIfExists(id);

        Disciplina disciplinaToUpdate = new Disciplina(disciplinaDTO);
        //disciplinaToUpdate.setProfessores(disciplina.getProfessores());

        Disciplina updatedDisciplina = disciplinaRepository.save(disciplinaToUpdate);
        return criaMessageResponse(updatedDisciplina.getId(), "Disciplina atualizada com ID ");
    }

    public DisciplinaDTO findById(Long id) throws DisciplinaNotFoundException {
        Disciplina disciplina = verifyIfExists(id);
        DisciplinaDTO disciplinaDTO = new DisciplinaDTO(disciplina);

        return disciplinaDTO;
    }

      public MessageResponseDTO delete(Long id) throws DisciplinaNotFoundException, DeleteException {
            verifyIfExists(id);
            if(disciplinaRepository.DisciplinaHasReference(id) > 0){
                throw new DeleteException(id,"Disciplina");
            }

            disciplinaRepository.deleteById(id);
            return criaMessageResponse(id,"Disciplina excluida com ID ");
        }


    private Disciplina verifyIfExists(Long id) throws DisciplinaNotFoundException {
        return disciplinaRepository.findById(id)
                .orElseThrow(() -> new DisciplinaNotFoundException(id));
    }

    private MessageResponseDTO criaMessageResponse(Long id, String message) {
        return MessageResponseDTO
                .builder()
                .message(message + id)
                .build();
    }
}
