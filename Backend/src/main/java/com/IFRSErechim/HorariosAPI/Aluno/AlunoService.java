package com.IFRSErechim.HorariosAPI.Aluno;

import com.IFRSErechim.HorariosAPI.Disciplina.Disciplina;
import com.IFRSErechim.HorariosAPI.Disciplina.DisciplinaService;
import com.IFRSErechim.HorariosAPI.Exception.*;
import com.IFRSErechim.HorariosAPI.ParsedRecords.ParsedRecords;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseImportDTO;
import com.univocity.parsers.common.record.Record;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    private DisciplinaService discipinaService;

    public Page<AlunoDTO> findAll(Pageable pageable, String search){
        Page<Aluno> result = alunoRepository.findAllAlunos(pageable,search);
        return result.map(x -> new AlunoDTO(x));
    }
    public AlunoDTO findById(Long id) throws NotFoundException {
        Aluno aluno = verifyIfExists(id);

        return new AlunoDTO(aluno);
    }
    public MessageResponseImportDTO importAluno(MultipartFile file) throws ParseError, WrongCollumnsException {
        Integer atualizadas=0;
        Integer inseridas=0;
        Integer erros=0;
        Integer naoExistem=0;
        List<HashMap> errorFile = new ArrayList<>();

        List<Record> parseAllRecords = new ParsedRecords(file).getRecords();
        for(int i=0;i<parseAllRecords.size();i++){
            HashMap<String,String> errorLine = new HashMap<>();
            Record record = parseAllRecords.get(i);
            Aluno aluno = new Aluno();
            try{
                if((record.getString("nome") != null)  || (record.getString("cpf")!= null))
                {
                    if(!(record.getString("nome")==null)){
                        aluno.setNomeCompleto(record.getString("nome"));
                    }

                    if(!(record.getString("cpf")==null)){
                        String cpf = record.getString("cpf");
                        if(cpf.length()>11){
                            cpf = cpf.replace(".","");
                            cpf = cpf.replace("-","");
                        }
                        aluno.setCpf(cpf);
                    }

                    Aluno alunoDB = alunoRepository.findByNomeOrCpf(aluno.getNomeCompleto(), aluno.getCpf());

                    if(alunoDB != null){
                        if(aluno.getCpf()==null){
                            aluno.setCpf(alunoDB.getCpf());
                        }
                        aluno.setId(alunoDB.getId());
                        aluno.setNomeCompleto(alunoDB.getNomeCompleto());
                        aluno.setDisciplinas(alunoDB.getDisciplinas());
                        atualizadas++;
                    }else{
                        inseridas++;
                    }

                    if((record.getString("disciplina_nome")!= null) || (record.getString("disciplina_cod")!=null)){
                        String disciplina_nome = null;
                        String disciplina_cod= null;

                        if(record.getString("disciplina_nome") != null){
                            disciplina_nome = record.getString("disciplina_nome");
                        }
                        if(record.getString("disciplina_cod")!=null){
                            disciplina_cod = record.getString("disciplina_cod");
                        }
                        Disciplina disciplina;
                        try{
                             disciplina = discipinaService.findByNomeOrCodMoodle(disciplina_nome,disciplina_cod);
                            if(disciplina!=null){
                                Set<Disciplina> disciplinaSet = new HashSet<>(aluno.getDisciplinas());
                                disciplinaSet.add(disciplina);
                                List<Disciplina> disciplinaList = new ArrayList<>(disciplinaSet);
                                aluno.setDisciplinas(disciplinaList);
                            }else{
                                errorLine.put("nome", record.getString("nome"));
                                errorLine.put("matricula", record.getString("matricula"));
                                errorLine.put("cpf", record.getString("cpf"));
                                errorLine.put("disciplina_nome", record.getString("disciplina_nome"));
                                errorLine.put("disciplina_cod", record.getString("disciplina_cod"));
                                errorLine.put("motivo", "Disciplina não existe");
                                naoExistem++;
                            }
                        }catch (IncorrectResultSizeDataAccessException e){
                            errorLine.put("nome", record.getString("nome"));
                            errorLine.put("matricula", record.getString("matricula"));
                            errorLine.put("cpf", record.getString("cpf"));
                            errorLine.put("disciplina_nome", record.getString("disciplina_nome"));
                            errorLine.put("disciplina_cod", record.getString("disciplina_cod"));
                            errorLine.put("motivo", "Existem mais que uma disciplina com este nome");
                            naoExistem++;
                        }
                    }
                    if(record.getString("matricula")!=null){
                        aluno.setMatricula(record.getString("matricula"));
                    }

                    if(aluno.getNomeCompleto()==null){
                        errorLine.put("nome", record.getString("nome"));
                        errorLine.put("matricula", record.getString("matricula"));
                        errorLine.put("cpf", record.getString("cpf"));
                        errorLine.put("disciplina_nome", record.getString("disciplina_nome"));
                        errorLine.put("disciplina_cod", record.getString("disciplina_cod"));
                        errorLine.put("motivo", "Nome vazio");
                        inseridas--;
                        erros++;
                    }else{
                        if(alunoDB!=null){
                            if(Objects.equals(aluno.getNomeCompleto(),alunoDB.getNomeCompleto()) &&
                                    Objects.equals(aluno.getDisciplinas(),alunoDB.getDisciplinas()) &&
                                    Objects.equals(aluno.getMatricula(),aluno.getMatricula()))
                            {
                                atualizadas--;
                            }else{
                                alunoRepository.save(aluno);
                            }
                        }else{
                            alunoRepository.save(aluno);
                        }
                    }
                }else{
                    errorLine.put("nome", record.getString("nome"));
                    errorLine.put("matricula", record.getString("matricula"));
                    errorLine.put("cpf", record.getString("cpf"));
                    errorLine.put("disciplina_nome", record.getString("disciplina_nome"));
                    errorLine.put("disciplina_cod", record.getString("disciplina_cod"));
                    errorLine.put("motivo", "Nome ou CPF vazios");
                    erros++;
                }
            }catch(IllegalArgumentException e){
                throw new WrongCollumnsException("O arquivo deve conter as colunas nome, matricula, cpf, disciplina_cod e disciplina_nome");
            }catch (IncorrectResultSizeDataAccessException e){
                //Ja foi adicionado nas linhas com erro
            }

            if(!errorLine.isEmpty()){
                errorFile.add(errorLine);
            }
        }
        return criaMessageResponseImport(inseridas,atualizadas,erros,naoExistem,errorFile);
    }
    public MessageResponseDTO criaAluno (AlunoDTO alunoDTO) throws AlreadyExistsException {
        if(alunoRepository.findByCpf(alunoDTO.getCpf()) > 0){
            throw new AlreadyExistsException("Aluno já cadastrado!");
        }
        String cpf = alunoDTO.getCpf();
        if(cpf.length()>11){
            cpf = cpf.replace(".","");
            cpf = cpf.replace("-","");
        }
        alunoDTO.setCpf(cpf);
        Aluno salvarAluno = new Aluno(alunoDTO);

        Aluno alunoSalvo = alunoRepository.save(salvarAluno);

        return criaMessageResponse("Aluno "+alunoSalvo.getNomeCompleto()+" cadastrado!");
    }
    public MessageResponseDTO UpdateById(Long id,AlunoDTO alunoDTO) throws NotFoundException{
            verifyIfExists(id);

            String cpf = alunoDTO.getCpf();
            if(cpf.length()>11){
                cpf = cpf.replace(".","");
                cpf = cpf.replace("-","");
            }
            alunoDTO.setCpf(cpf);
            Aluno alunoToUpdate = new Aluno(alunoDTO);

            Aluno updatedAluno = alunoRepository.save(alunoToUpdate);
            return criaMessageResponse("Aluno "+updatedAluno.getNomeCompleto()+" atualizado!");
    }
    public MessageResponseDTO delete(Long id) throws NotFoundException, DeleteException {
            Aluno alunoToDelete = verifyIfExists(id);

            alunoRepository.deleteById(id);
            return criaMessageResponse("Aluno "+alunoToDelete.getNomeCompleto()+" deletado!");
    }

    private Aluno verifyIfExists(Long id) throws NotFoundException {
            return alunoRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Aluno"));
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
