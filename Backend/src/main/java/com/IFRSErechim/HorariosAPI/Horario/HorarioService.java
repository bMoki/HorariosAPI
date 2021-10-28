package com.IFRSErechim.HorariosAPI.Horario;

import com.IFRSErechim.HorariosAPI.Exception.DeleteException;
import com.IFRSErechim.HorariosAPI.Exception.LimitHorarioExceeded;
import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import com.IFRSErechim.HorariosAPI.Turma.Turma;
import com.IFRSErechim.HorariosAPI.Turma.TurmaService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class HorarioService {

    @Autowired
    private HorarioRepository horarioRepository;

    private TurmaService turmaService;

     public Page<HorarioDTO> findAll(Pageable pageable){
                Page<Horario> result = horarioRepository.findAll(pageable);
                return result.map(x -> new HorarioDTO(x));
     }

    public HorarioDTO findById(Long id) throws NotFoundException {
        Horario horario = verifyIfExists(id);
        return new HorarioDTO(horario);
    }

    public MessageResponseDTO criaHorario (HorarioDTO horarioDTO) throws NotFoundException, LimitHorarioExceeded{

            Horario salvarHorario = new Horario(horarioDTO);
            Turma turmaToAddHorario = turmaService.verifyIfExistsById(horarioDTO.getTurma().getId());

            if(turmaToAddHorario.getHorarios().size() == 10){
                throw new LimitHorarioExceeded(turmaToAddHorario.getId());
            }else{
                if(isLimitExceeded(salvarHorario.getPeriodo(),turmaToAddHorario.getHorarios()))
                    throw new LimitHorarioExceeded(turmaToAddHorario.getId());

            }
            Horario HorarioSalvo = horarioRepository.save(salvarHorario);
            turmaToAddHorario.addHorario(HorarioSalvo);
            Turma turmaSalva = turmaService.save(turmaToAddHorario);

            return criaMessageResponse(turmaSalva.getId(), "Horario criado para turma com ID ");

        }

        public MessageResponseDTO UpdateById(Long id,HorarioDTO horarioDTO) throws NotFoundException{
                verifyIfExists(id);

                Horario horarioToUpdate = new Horario(horarioDTO);


                Horario updatedHorario = horarioRepository.save(horarioToUpdate);
                return criaMessageResponse(updatedHorario.getId(), "Horario atualizado com ID ");
        }

         public MessageResponseDTO delete(Long id) throws NotFoundException, DeleteException {
                    Horario horarioToRemove = verifyIfExists(id);
                    Turma turmaToRemoveHorario = turmaService.verifyIfExistsById(horarioToRemove.getTurma().getId());

                    turmaToRemoveHorario.removeHorario(horarioToRemove);

                    horarioRepository.deleteById(id);
                    return criaMessageResponse(id,"Horario excluido com ID ");
        }

    private Horario verifyIfExists(Long id) throws NotFoundException {
            return horarioRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException(id));
    }

    private Boolean isLimitExceeded (Integer periodo, List<Horario> horarios){
        if(horarios.stream()
                .filter(h -> h.getPeriodo() == periodo).collect(Collectors.toList()).size() == 5) return true;
        return false;
    }

    private MessageResponseDTO criaMessageResponse(Long id, String message) {
            return MessageResponseDTO
                    .builder()
                    .message(message + id)
                    .build();
    }
}
