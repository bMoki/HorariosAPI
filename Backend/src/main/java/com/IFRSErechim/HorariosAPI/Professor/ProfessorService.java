package com.IFRSErechim.HorariosAPI.Professor;

import com.IFRSErechim.HorariosAPI.Exception.*;
import com.IFRSErechim.HorariosAPI.ParsedRecords.ParsedRecords;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseImportDTO;
import com.univocity.parsers.common.record.Record;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class ProfessorService {

    @Autowired
    private ProfessorRepository professorRepository;

    @Transactional(readOnly = true)
    public Page<ProfessorDTO> findAll(Pageable pageable,String search){
        Page<Professor> result = professorRepository.findAllProfessores(pageable,search);
        return result.map(x -> new ProfessorDTO(x));
    }
    public MessageResponseImportDTO importProfessor (MultipartFile file) throws ParseError, WrongCollumnsException {
        Integer atualizadas=0;
        Integer inseridas=0;
        Integer erros=0;
        Integer naoExistem=0;
        List<HashMap> errorFile = new ArrayList<>();

        List<Record> parseAllRecords = new ParsedRecords(file).getRecords();
        for(int i=0;i<parseAllRecords.size();i++){
            HashMap<String,String> errorLine = new HashMap<>();
            Record record = parseAllRecords.get(i);
            Professor professor = new Professor();
            try{
                if((record.getString("nome") != null)  || (record.getString("cpf")!= null))
                {
                    if(!(record.getString("cpf")==null)){
                       String cpf = record.getString("cpf");
                        if(cpf.length()>11){
                            cpf = cpf.replace(".","");
                            cpf = cpf.replace("-","");
                        }
                        professor.setCpf(cpf);
                    }

                    if(!(record.getString("nome")==null)){
                        String nomeCompleto = record.getString("nome");
                        String nome = nomeCompleto.substring(0, nomeCompleto.indexOf(' '));
                        String sobrenome = nomeCompleto.substring(nomeCompleto.indexOf(' ') + 1);

                        professor.setNome(nome);
                        professor.setSobrenome(sobrenome);
                    }

                    Professor professorDB = professorRepository.findByNomeAndSobrenomeOrCpf(professor.getNome(),professor.getSobrenome(), professor.getCpf());
                    if(professorDB != null){
                        if(professor.getCpf()==null){
                            professor.setCpf(professorDB.getCpf());
                        }
                        professor.setSIAPE(professorDB.getSIAPE());
                        professor.setEmail(professorDB.getEmail());
                        professor.setDataNascimento(professorDB.getDataNascimento());
                        professor.setId(professorDB.getId());
                        atualizadas++;
                    }else{
                        inseridas++;
                    }

                    if(!(record.getString("email")== null)){
                        professor.setEmail(record.getString("email"));
                    }
                    if(!(record.getString("DataNascimento")== null)){
                        professor.setDataNascimento(LocalDate.parse(record.getString("dataNascimento")));
                    }
                    if(!(record.getString("siape")== null)){
                        professor.setSIAPE(record.getString("siape"));
                    }

                    if(professor.getCpf()==null){
                        errorLine.put("nome", record.getString("nome"));
                        errorLine.put("cpf", record.getString("cpf"));
                        errorLine.put("siape", record.getString("siape"));
                        errorLine.put("email", record.getString("email"));
                        errorLine.put("dataNascimento", record.getString("dataNascimento"));
                        naoExistem++;
                        inseridas--;
                    }else {
                        if (professorDB != null) {
                            if (Objects.equals(professor.getEmail(), professorDB.getEmail()) && Objects.equals(professor.getNome(), professorDB.getNome()) &&
                                    Objects.equals(professor.getSobrenome(), professorDB.getSobrenome()) && Objects.equals(professor.getSIAPE(), professorDB.getSIAPE()) &&
                                    Objects.equals(professor.getDataNascimento(), professorDB.getDataNascimento()))
                            {
                                atualizadas--;
                            } else {
                                professorRepository.save(professor);
                            }
                        } else {
                            professorRepository.save(professor);
                        }
                    }
                }else{
                    errorLine.put("nome", record.getString("nome"));
                    errorLine.put("cpf", record.getString("cpf"));
                    errorLine.put("siape", record.getString("siape"));
                    errorLine.put("email", record.getString("email"));
                    errorLine.put("dataNascimento", record.getString("dataNascimento"));
                    erros++;
                }
            }catch(IllegalArgumentException e){
                throw new WrongCollumnsException("O arquivo deve conter as colunas nome, cpf, email, siape e dataNascimento");
            }
            if(!errorLine.isEmpty()){
                errorFile.add(errorLine);
            }
        }
        return criaMessageResponseImport(inseridas,atualizadas,erros,naoExistem,errorFile);
    }
    public MessageResponseDTO criaProfessor (ProfessorDTO professorDTO) throws AlreadyExistsException {

        if(professorRepository.findByCpf(professorDTO.getCpf()) > 0){
            throw new AlreadyExistsException("CPF já cadastrado!");
        }

        String cpf = professorDTO.getCpf();
        if(cpf.length()>11){
            cpf = cpf.replace(".","");
            cpf = cpf.replace("-","");
        }
        professorDTO.setCpf(cpf);

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

        String cpf = professorDTO.getCpf();
        if(cpf.length()>11){
            cpf = cpf.replace(".","");
            cpf = cpf.replace("-","");
        }
        professorDTO.setCpf(cpf);
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
    public Professor findByNomeAndSobrenomeOrCpf (String nome, String sobrenome,String cpf){
        return professorRepository.findByNomeAndSobrenomeOrCpf(nome,sobrenome,cpf);
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
    private MessageResponseImportDTO criaMessageResponseImport(Integer inseridas, Integer atualizadas, Integer erros, Integer naoExistem, List<HashMap> file) {
        return MessageResponseImportDTO
                .builder()
                .inseridas(inseridas)
                .atualizadas(atualizadas)
                .erros(erros)
                .naoExistem(naoExistem)
                .file(file)
                .build();
    }
}

