package com.IFRSErechim.HorariosAPI.Turma;

import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class TurmaService {

    @Autowired
    private TurmaRepository turmaRepository;


    public FilterTurmaDTO verifyIfExistsById(Long id) throws NotFoundException {
        FilterTurmaDTO turma = new FilterTurmaDTO(turmaRepository.findById(id).orElseThrow(() -> new NotFoundException("Turma")));
        return turma;
    }


    public Turma save(Turma turmaToAddHorario) {
        return turmaRepository.save(turmaToAddHorario);
    }
}
