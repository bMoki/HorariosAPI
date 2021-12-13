package com.IFRSErechim.HorariosAPI.Professor;

import com.IFRSErechim.HorariosAPI.Exception.*;
import com.IFRSErechim.HorariosAPI.ParsedRecords.ParsedRecords;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import com.univocity.parsers.common.record.Record;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    public MessageResponseDTO importProfessor (MultipartFile file) throws LimitError, ParseError, AlreadyExistsException {
        List<Professor> professorList = new ArrayList<>();


        List<Integer> linhasError = new ArrayList<>();
        List<Record> parseAllRecords = new ParsedRecords(file).getRecords();
        for(int i=0;i<parseAllRecords.size();i++){
            Record record = parseAllRecords.get(i);
            Professor professor = new Professor();

            if(!(record.getString("nome") == null || record.getString("sobrenome")== null || record.getString("email")== null ||
                    record.getString("cpf")== null || record.getString("siape")== null || record.getString("DataNascimento")== null))
            {
                professor.setNome(record.getString("nome"));
                professor.setSobrenome(record.getString("sobrenome"));
                professor.setEmail(record.getString("email"));
                professor.setCpf(record.getString("cpf"));
                professor.setSIAPE(record.getString("siape"));
                professor.setDataNascimento(LocalDate.parse(record.getString("dataNascimento")));

                professorList.add(professor);
            }else{
                linhasError.add((i+1));
            }
        }
        parseAllRecords.forEach(record-> {


        });

        if(linhasError.size() > 5){
            throw new LimitError(linhasError);
        }
        try{
            List<Professor> professoresCriados = professorRepository.saveAll(professorList);
            if(linhasError.size()>0){
                String warn;
                if(linhasError.size() == 1){
                    warn = "A linha "+ linhasError +" não foi inserida, verifique-a!";
                }else{
                    warn = "As linhas "+ linhasError +" não foram inseridas, verifique-as!";
                }
                return criaMessageResponseWithWarning("Importação de "+professoresCriados.size()+" professores concluída!",warn );
            }
            return criaMessageResponse("Importação de "+professoresCriados.size()+" professores concluída!");
        }catch (DataIntegrityViolationException e){
            throw new AlreadyExistsException("Existe um CPF já cadastrado no arquivo!");
        }
    }

    public MessageResponseDTO criaProfessor (ProfessorDTO professorDTO) throws AlreadyExistsException {

        if(professorRepository.findByCpf(professorDTO.getCpf()) > 0){
            throw new AlreadyExistsException("CPF já cadastrado!");
        }

        Professor salvarProfessor = new Professor(professorDTO);
        Professor ProfessorSalvo = professorRepository.save(salvarProfessor);
        return criaMessageResponse("Professor "+ProfessorSalvo.getNome()+" "+ProfessorSalvo.getSobrenome()+" cadastrado!");
    }
    public ProfessorDTO findById(Long id) throws NotFoundException {
        Professor professor = verifyIfExistsById(id);
        ProfessorDTO professorDTO = new ProfessorDTO(professor);

        return professorDTO;
    }

    public MessageResponseDTO updateById(Long id, ProfessorDTO professorDTO) throws NotFoundException {

        verifyIfExistsById(id);
        Professor professorToUpdate = new Professor(professorDTO);

        Professor updatedProfessor = professorRepository.save(professorToUpdate);
        return criaMessageResponse("Professor "+updatedProfessor.getNome()+" "+updatedProfessor.getSobrenome()+" atualizado!");
    }

    public MessageResponseDTO delete(Long id) throws NotFoundException, DeleteException {
        Professor professorToDelete = verifyIfExistsById(id);
        if(professorRepository.ProfessorHasReference(id) > 0){
            throw new DeleteException("Professor");
        }

        professorRepository.deleteById(id);
        return criaMessageResponse("Professor "+professorToDelete.getNome()+" "+professorToDelete.getSobrenome()+ " deletado!");
    }

    private Professor verifyIfExistsById(Long id) throws NotFoundException {
        return professorRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Professor"));
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
