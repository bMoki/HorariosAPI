package com.IFRSErechim.HorariosAPI.Horario;

import com.IFRSErechim.HorariosAPI.Exception.DeleteException;
import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
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

     public Page<HorarioDTO> findAll(Pageable pageable){
                Page<Horario> result = horarioRepository.findAll(pageable);
                return result.map(x -> new HorarioDTO(x));
     }

    public HorarioDTO findById(Long id) throws NotFoundException {
        Horario horario = verifyIfExists(id);
        HorarioDTO horarioDTO = new HorarioDTO(horario);

        return horarioDTO;
    }

    public Horario criaHorario (HorarioDTO horarioDTO) {

            Horario salvarHorario = new Horario(horarioDTO);

            Horario HorarioSalvo = horarioRepository.save(salvarHorario);

            return HorarioSalvo;
        }

        public MessageResponseDTO UpdateById(Long id,HorarioDTO horarioDTO) throws NotFoundException{
                verifyIfExists(id);

                Horario horarioToUpdate = new Horario(horarioDTO);


                Horario updatedHorario = horarioRepository.save(horarioToUpdate);
                return criaMessageResponse(updatedHorario.getId(), "Horario atualizado com ID ");
        }

         public MessageResponseDTO delete(Long id) throws NotFoundException, DeleteException {
                    verifyIfExists(id);

                    horarioRepository.deleteById(id);
                    return criaMessageResponse(id,"Horario excluido com ID ");
        }

    private Horario verifyIfExists(Long id) throws NotFoundException {
            return horarioRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException(id));
    }

    private MessageResponseDTO criaMessageResponse(Long id, String message) {
            return MessageResponseDTO
                    .builder()
                    .message(message + id)
                    .build();
    }
}
