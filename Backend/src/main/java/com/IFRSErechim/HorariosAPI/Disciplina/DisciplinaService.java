package com.IFRSErechim.HorariosAPI.Disciplina;

import com.IFRSErechim.HorariosAPI.Exception.*;
import com.IFRSErechim.HorariosAPI.ParsedRecords.ParsedRecords;
import com.IFRSErechim.HorariosAPI.Professor.Professor;
import com.IFRSErechim.HorariosAPI.Professor.ProfessorService;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import com.univocity.parsers.common.record.Record;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


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

    public MessageResponseDTO importDisciplina (MultipartFile file) throws  ParseError, WrongCollumnsException, NotFoundException {
        List<Disciplina> disciplinaList = new ArrayList<>();
        Professor professor = new Professor();

        List<Integer> linhasError = new ArrayList<>();
        List<Record> parseAllRecords = new ParsedRecords(file).getRecords();
        for(int i=0;i<parseAllRecords.size();i++){
            Record record = parseAllRecords.get(i);
            Disciplina disciplina = new Disciplina();
            try{
                if(!(record.getString("nome") == null || record.getString("codMoodle")== null))
                {
                    disciplina.setNome(record.getString("nome"));
                    disciplina.setCodMoodle(Long.parseLong(record.getString("codMoodle")));

                    if(!(record.getString("professor")== null)){
                        Long id = professorService.findByCpf(record.getString("professor"));
                        if(id==0) linhasError.add(i+1);
                        professor.setId(id);
                    }

                    disciplinaList.add(disciplina);
                }else{
                    linhasError.add((i+1));
                }
            }catch(IllegalArgumentException e){
                throw new WrongCollumnsException("O arquivo deve conter as colunas nome, codMoodle e professor");
            }
        }

        Integer linhasInseridas = 0;
        Integer linhasAtualizadas = 0;


        for(Disciplina disciplina : disciplinaList){
            Long id = disciplinaRepository.findByCodMoodle(disciplina.getCodMoodle());
            if(id>0){
                disciplina = verifyIfExists(id);
                if(!(professor.getId()==0)){
                    disciplina.getProfessores().add(professor);
                }
                linhasAtualizadas++;
            }else{
                linhasInseridas++;
            }
            disciplinaRepository.save(disciplina);
        }

        if(linhasError.size()>0){
            String warn;
            if(linhasError.size() == 1){
                warn = "A linha "+ linhasError +" não foi inserida, verifique-a!";
            }else{
                warn = "As linhas "+ linhasError +" não foram inseridas, verifique-as!";
            }
            return criaMessageResponseWithWarning("Inserção de "+linhasInseridas+" e atualização de "+linhasAtualizadas+" professores concluída!",warn );
        }
        return criaMessageResponse("Inserção de "+linhasInseridas+" e atualização de "+linhasAtualizadas+" professores concluída!");

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

    private MessageResponseDTO criaMessageResponseWithWarning(String message,String warning) {
        return MessageResponseDTO
                .builder()
                .message(message)
                .warning(warning)
                .build();
    }
}
