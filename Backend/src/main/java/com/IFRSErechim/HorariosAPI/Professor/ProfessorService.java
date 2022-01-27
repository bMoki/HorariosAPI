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

import java.nio.charset.StandardCharsets;
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

    public MessageResponseDTO importProfessor (MultipartFile file) throws ParseError, WrongCollumnsException {
        Integer linhasAtualizadas=0;
        Integer linhasInseridas=0;

        List<Integer> linhasError = new ArrayList<>();
        List<Integer> linhasProfessorNaoExiste = new ArrayList<>();

        List<Record> parseAllRecords = new ParsedRecords(file).getRecords();
        for(int i=0;i<parseAllRecords.size();i++){
            Record record = parseAllRecords.get(i);
            Professor professor = new Professor();
            try{
                if((record.getString("nome") != null)  || (record.getString("cpf")!= null))
                {
                    if(!(record.getString("cpf")==null)){
                       String cpf = record.getString("cpf");
                        if(cpf.length()==11){
                            StringBuffer cpfFormated = new StringBuffer(record.getString("professor_cpf"));
                            cpfFormated.insert(2 + 1, ".");
                            cpfFormated.insert(6 + 1, ".");
                            cpfFormated.insert(10 + 1, "-");
                            cpf = cpfFormated.toString();
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
                            professor = professorDB;
                        }else{
                            professor.setId(professorDB.getId());
                        }
                        linhasAtualizadas++;
                    }else{
                        linhasInseridas++;
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
                        linhasProfessorNaoExiste.add((i+2));
                        linhasInseridas--;
                    }else{
                        professorRepository.save(professor);
                    }

                }else{
                    linhasError.add((i+2));
                }
            }catch(IllegalArgumentException e){
                throw new WrongCollumnsException("O arquivo deve conter as colunas nome, cpf, email, siape e dataNascimento");
            }

        }

        if(linhasError.size() > 0 || linhasProfessorNaoExiste.size() > 0){
            String warn="";
            String warn2="";
            if(linhasProfessorNaoExiste.size() == 1){
                warn2 = "Professor da linha "+linhasProfessorNaoExiste+" não existe";
            }else{
                if(linhasProfessorNaoExiste.size() != 0){
                    warn2 = "Professores das linhas "+linhasProfessorNaoExiste+" não existem";
                }
            }
            if(linhasError.size() == 1){
                warn = "A linha "+ linhasError +" não foi inserida";

            }else{
                if(linhasError.size() != 0){
                    warn = "As linhas "+ linhasError +" não foram inseridas";
                }
            }

            if(!warn2.isEmpty()){
                if(!warn.isEmpty()){
                    warn = warn+" e "+warn2;
                }else{
                    warn = warn2;
                }
            }
            return criaMessageResponseWithWarning("Inserção de "+linhasInseridas+" e atualização de "+linhasAtualizadas+" professores concluída!",warn );
        }
        return criaMessageResponse("Inserção de "+linhasInseridas+" e atualização de "+linhasAtualizadas+" professores concluída!");

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

    public Long findByCpf (String cpf){
        return professorRepository.findByCpf(cpf);
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

    private MessageResponseDTO criaMessageResponseWithWarning(String message,String warning) {
        return MessageResponseDTO
                .builder()
                .message(message)
                .warning(warning)
                .build();
    }


}
