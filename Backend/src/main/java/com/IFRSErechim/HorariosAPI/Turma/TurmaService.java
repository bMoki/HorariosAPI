package com.IFRSErechim.HorariosAPI.Turma;

import com.IFRSErechim.HorariosAPI.Exception.AlreadyExistsException;
import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
import com.IFRSErechim.HorariosAPI.Horario.Horario;
import com.IFRSErechim.HorariosAPI.Horario.HorarioDTO;
import com.IFRSErechim.HorariosAPI.Horario.HorarioService;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TurmaService {

    @Autowired
    private TurmaRepository turmaRepository;

    private HorarioService horarioService;

    @Transactional(readOnly = true)
    public List<TurmaDTO> findAll(){
        List<Turma> result = turmaRepository.findAll();
        return result.stream().map(x -> new TurmaDTO(x)).collect(Collectors.toList());
    }

    public TurmaDTO criaTurma (TurmaDTO turmaDTO) throws AlreadyExistsException {

        if(turmaRepository.findByNome(turmaDTO.getNome()) > 0){
            throw new AlreadyExistsException("Turma já cadastrada!");
        }

        Turma salvarTurma = new Turma(turmaDTO);
        TurmaDTO TurmaSalvaDTO = new TurmaDTO(turmaRepository.save(salvarTurma));
        return TurmaSalvaDTO;
    }

    public TurmaDTO findById(Long id) throws NotFoundException {
        Turma turma = verifyIfExistsById(id);
        TurmaDTO turmaDTO = new TurmaDTO(turma);

        return turmaDTO;
    }

    public MessageResponseDTO AddHorarioTurma(Long turmaId, HorarioDTO novoHorarioDTO) throws NotFoundException {

        verifyIfExistsById(turmaId);
        Turma turmaToAddHorario = verifyIfExistsById(turmaId);

        Horario novoHorario = horarioService.criaHorario(novoHorarioDTO);

        turmaToAddHorario.getHorarios().add(novoHorario);

        Turma turmaSalva = turmaRepository.save(turmaToAddHorario);
        return criaMessageResponse(turmaSalva.getId(), "Horario criado para turma com ID ");
    }

//
//    public MessageResponseDTO delete(Long id) throws ProfessorNotFoundException, DeleteException {
//        verifyIfExistsById(id);
//        if(professorRepository.ProfessorHasReference(id) > 0){
//            throw new DeleteException(id,"Professor");
//        }
//
//        professorRepository.deleteById(id);
//        return criaMessageResponse(id,"Professor excluido com ID ");
//    }
//
    private Turma verifyIfExistsById(Long id) throws NotFoundException {
        return turmaRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(id));
    }
//
////    private Integer verifyIfExistsByCPF(String cpf) {
////        return professorRepository.findByCpf(cpf);
////    }
//
    private MessageResponseDTO criaMessageResponse(Long id, String message) {
        return MessageResponseDTO
                .builder()
                .message(message + id)
                .build();
   }
}
