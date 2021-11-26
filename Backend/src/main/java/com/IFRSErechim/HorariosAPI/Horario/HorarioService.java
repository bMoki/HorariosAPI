package com.IFRSErechim.HorariosAPI.Horario;

import com.IFRSErechim.HorariosAPI.Exception.LimitHorarioExceeded;
import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import com.IFRSErechim.HorariosAPI.Turma.FilterTurmaDTO;
import com.IFRSErechim.HorariosAPI.Turma.Turma;
import com.IFRSErechim.HorariosAPI.Turma.TurmaService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

   @Transactional
    public MessageResponseDTO criaHorario (HorarioDTO horarioDTO) throws NotFoundException, LimitHorarioExceeded{

            Horario salvarHorario = new Horario(horarioDTO);
            FilterTurmaDTO turmaToAddHorario = turmaService.verifyIfExistsById(horarioDTO.getTurma().getId());

            if(turmaToAddHorario.getHorarios().size() == 10){
                throw new LimitHorarioExceeded(turmaToAddHorario.getId());
            }else{
                if(isLimitExceeded(salvarHorario.getPeriodo(),turmaToAddHorario.getHorarios()))
                    throw new LimitHorarioExceeded(turmaToAddHorario.getId());

            }

            Horario HorarioSalvo = horarioRepository.save(salvarHorario);
            Turma turma = new Turma(turmaToAddHorario);

            turma.addHorario(HorarioSalvo);
            turmaService.save(turma);

            return criaMessageResponse("Horario cadastrado!");

        }



        public MessageResponseDTO UpdateById(Long id,HorarioDTO horarioDTO) throws NotFoundException{
                verifyIfExists(id);

                Horario horarioToUpdate = new Horario(horarioDTO);


                horarioRepository.save(horarioToUpdate);
                return criaMessageResponse("Horario atualizado!");
        }

         public MessageResponseDTO delete(Long id) throws NotFoundException {
                    verifyIfExists(id);

                    horarioRepository.deleteById(id);
                    return criaMessageResponse("Horario deletado!");
        }

    private Horario verifyIfExists(Long id) throws NotFoundException {
            return horarioRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Horario"));
    }

    private Boolean isLimitExceeded (Integer periodo, List<FilterHorarioDTO> horarios){
        return horarios.stream()
                .filter(h -> h.getPeriodo() == periodo).collect(Collectors.toList()).size() == 5;
    }

    private MessageResponseDTO criaMessageResponse(String message) {
            return MessageResponseDTO
                    .builder()
                    .message(message)
                    .build();
    }


}
