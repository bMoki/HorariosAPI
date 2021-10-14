package com.IFRSErechim.HorariosAPI.Curso;

import com.IFRSErechim.HorariosAPI.Disciplina.Disciplina;
import com.IFRSErechim.HorariosAPI.Disciplina.DisciplinaDTO;
import com.IFRSErechim.HorariosAPI.Disciplina.DisciplinaService;
import com.IFRSErechim.HorariosAPI.Exception.DeleteException;
import com.IFRSErechim.HorariosAPI.Exception.DisciplinaNotFoundException;
import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
import com.IFRSErechim.HorariosAPI.Professor.ProfessorDTO;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    private DisciplinaService disciplinaService;

    public Page<CursoDTO> findAll(Pageable pageable){
            Page<Curso> result = cursoRepository.findAll(pageable);
        return result.map(x -> new CursoDTO(x));
    }

    public CursoDTO findById(Long id) throws NotFoundException {
        Curso curso = verifyIfExists(id);
        CursoDTO cursoDTO = new CursoDTO(curso);

        return cursoDTO;
    }

    public MessageResponseDTO criaCurso (CursoDTO cursoDTO) {

        Curso salvarCurso = new Curso(cursoDTO);

        Curso CursoSalvo = cursoRepository.save(salvarCurso);
        return criaMessageResponse(CursoSalvo.getId(), "Curso criado com ID ");
    }

    public MessageResponseDTO UpdateById(Long id,CursoDTO cursoDTO) throws NotFoundException{
            verifyIfExists(id);

            Curso cursoToUpdate = new Curso(cursoDTO);


            Curso updatedCurso = cursoRepository.save(cursoToUpdate);
            return criaMessageResponse(updatedCurso.getId(), "Curso atualizado com ID ");
    }

     public MessageResponseDTO delete(Long id) throws NotFoundException, DeleteException {
                verifyIfExists(id);
                if(cursoRepository.CursoHasReference(id) > 0){
                    throw new DeleteException(id,"Curso");
                }

                cursoRepository.deleteById(id);
                return criaMessageResponse(id,"Curso excluido com ID ");
    }

    public MessageResponseDTO atribuiDisciplinaParaCurso (Long cursoId, Long disciplinaId) throws DisciplinaNotFoundException, NotFoundException {
            DisciplinaDTO disciplinaDTO = disciplinaService.findById(disciplinaId);
            Disciplina disciplina = new Disciplina(disciplinaDTO);

            CursoDTO cursoDTO = findById(cursoId);
            Curso curso = new Curso(cursoDTO);
            curso.Disciplinas(disciplina);

            Curso CursoSalvo = cursoRepository.save(curso);

            return criaMessageResponse(CursoSalvo.getId(), "Curso atualizado com ID ");
        }

    private Curso verifyIfExists(Long id) throws NotFoundException {
            return cursoRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException(id));
    }

    private MessageResponseDTO criaMessageResponse(Long id, String message) {
            return MessageResponseDTO
                    .builder()
                    .message(message + id)
                    .build();
    }
}
