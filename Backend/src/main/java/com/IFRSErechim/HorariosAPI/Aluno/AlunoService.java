package com.IFRSErechim.HorariosAPI.Aluno;

import com.IFRSErechim.HorariosAPI.Disciplina.Disciplina;
import com.IFRSErechim.HorariosAPI.Disciplina.DisciplinaService;
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

import java.util.*;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    private DisciplinaService discipinaService;

    public Page<AlunoDTO> findAll(Pageable pageable){
        Page<Aluno> result = alunoRepository.findAll(pageable);
        return result.map(x -> new AlunoDTO(x));
    }

    public AlunoDTO findById(Long id) throws NotFoundException {
        Aluno aluno = verifyIfExists(id);

        return new AlunoDTO(aluno);
    }
    public MessageResponseDTO importAluno(MultipartFile file) throws ParseError, WrongCollumnsException {
        Integer linhasAtualizadas=0;
        Integer linhasInseridas=0;

        List<Integer> linhasError = new ArrayList<>();
        List<Integer> linhasDisciplinaNaoExiste = new ArrayList<>();
        List<Record> parseAllRecords = new ParsedRecords(file).getRecords();
        for(int i=0;i<parseAllRecords.size();i++){
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
                        if(cpf.length()==11){
                            StringBuffer cpfFormated = new StringBuffer(record.getString("professor_cpf"));
                            cpfFormated.insert(2 + 1, ".");
                            cpfFormated.insert(6 + 1, ".");
                            cpfFormated.insert(10 + 1, "-");
                            cpf = cpfFormated.toString();
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
                        linhasAtualizadas++;
                    }else{
                        linhasInseridas++;
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
                        Disciplina disciplina = discipinaService.findByNomeOrCodMoodle(disciplina_nome,disciplina_cod);
                        if(disciplina!=null){
                            Set<Disciplina> disciplinaSet = new HashSet<>(aluno.getDisciplinas());
                            disciplinaSet.add(disciplina);
                            List<Disciplina> disciplinaList = new ArrayList<>(disciplinaSet);
                            aluno.setDisciplinas(disciplinaList);
                        }else{
                            linhasDisciplinaNaoExiste.add((i+2));
                        }
                    }
                    if(record.getString("matricula")!=null){
                        aluno.setMatricula(record.getString("matricula"));
                    }

                    if(aluno.getNomeCompleto()==null){
                        linhasError.add((i+2));
                        linhasInseridas--;
                    }else{
                        if(alunoDB!=null){
                            if(Objects.equals(aluno.getNomeCompleto(),alunoDB.getNomeCompleto()) &&
                                    Objects.equals(aluno.getDisciplinas(),alunoDB.getDisciplinas()) &&
                                    Objects.equals(aluno.getMatricula(),aluno.getMatricula()))
                            {
                                linhasAtualizadas--;
                            }else{
                                alunoRepository.save(aluno);
                            }
                        }else{
                            alunoRepository.save(aluno);
                        }
                    }
                }else{
                    linhasError.add((i+2));
                }
            }catch(IllegalArgumentException e){
                throw new WrongCollumnsException("O arquivo deve conter as colunas nome, matricula, cpf, disciplina_cod e disciplina_nome");
            }
        }

        if(linhasError.size() > 0 || linhasDisciplinaNaoExiste.size() > 0){
            String warn="";
            String warn2="";
            if(linhasDisciplinaNaoExiste.size() == 1){
                warn2 = "Disciplina da linha "+linhasDisciplinaNaoExiste+" não existe";
            }else{
                if(linhasDisciplinaNaoExiste.size() != 0){
                    warn2 = "Disciplinas das linhas "+linhasDisciplinaNaoExiste+" não existem";
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
            return criaMessageResponseWithWarning("Inserção de "+linhasInseridas+" e atualização de "+linhasAtualizadas+" alunos concluída!",warn );
        }
        return criaMessageResponse("Inserção de "+linhasInseridas+" e atualização de "+linhasAtualizadas+" alunos concluída!");

    }

    public MessageResponseDTO criaAluno (AlunoDTO alunoDTO) throws AlreadyExistsException {
        if(alunoRepository.findByCpf(alunoDTO.getCpf()) > 0){
            throw new AlreadyExistsException("Aluno já cadastrado!");
        }
        Aluno salvarAluno = new Aluno(alunoDTO);

        Aluno alunoSalvo = alunoRepository.save(salvarAluno);

        return criaMessageResponse("Aluno "+alunoSalvo.getNomeCompleto()+" cadastrado!");
    }

    public MessageResponseDTO UpdateById(Long id,AlunoDTO alunoDTO) throws NotFoundException{
            verifyIfExists(id);
            Aluno alunoToUpdate = new Aluno(alunoDTO);

            Aluno updatedAluno = alunoRepository.save(alunoToUpdate);
            return criaMessageResponse("Aluno "+updatedAluno.getNomeCompleto()+" atualizado!");
    }

     public MessageResponseDTO delete(Long id) throws NotFoundException, DeleteException {
                Aluno alunoToDelete = verifyIfExists(id);
//                if(alunoRepository.AlunoHasReference(id) > 0){
//                    throw new DeleteException(id,"Aluno");
//                }

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
    private MessageResponseDTO criaMessageResponseWithWarning(String message,String warning) {
        return MessageResponseDTO
                .builder()
                .message(message)
                .warning(warning)
                .build();
    }
}
