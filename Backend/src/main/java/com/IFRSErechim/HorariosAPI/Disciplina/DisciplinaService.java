package com.IFRSErechim.HorariosAPI.Disciplina;

import com.IFRSErechim.HorariosAPI.Exception.*;
import com.IFRSErechim.HorariosAPI.ParsedRecords.ParsedRecords;
import com.IFRSErechim.HorariosAPI.Professor.Professor;
import com.IFRSErechim.HorariosAPI.Professor.ProfessorService;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseImportDTO;
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
public class DisciplinaService {

    @Autowired
    private DisciplinaRepository disciplinaRepository;

    private ProfessorService professorService;

    public Page<DisciplinaDTO> findAll(Pageable pageable,String search){
        Page<Disciplina> result = disciplinaRepository.findAllDisciplinas(pageable,search);
        return result.map(x -> new DisciplinaDTO(x));
    }
    public MessageResponseImportDTO importDisciplina (MultipartFile file) throws  ParseError, WrongCollumnsException {
        Integer atualizadas=0;
        Integer inseridas=0;
        Integer erros=0;
        Integer naoExistem=0;
        List<HashMap> errorFile = new ArrayList<>();

        List<Record> parseAllRecords = new ParsedRecords(file).getRecords();
        for(int i=0;i<parseAllRecords.size();i++){
            HashMap<String,String> errorLine = new HashMap<>();
            Record record = parseAllRecords.get(i);
            Disciplina disciplina = new Disciplina();
            try{
                if((record.getString("nome") != null)  || (record.getString("codMoodle")!= null))
                {
                    if(!(record.getString("nome")==null)){
                        disciplina.setNome(record.getString("nome"));
                    }

                    if(!(record.getString("codMoodle")==null)){
                        disciplina.setCodMoodle(record.getString("codMoodle"));
                    }

                    Disciplina disciplinaDB = disciplinaRepository.findByCodMoodle(disciplina.getCodMoodle());
                    if(disciplinaDB != null){
                        disciplina.setId(disciplinaDB.getId());
                        disciplina.setProfessores(disciplinaDB.getProfessores());
                        atualizadas++;
                    }else{
                        inseridas++;
                    }

                    if((record.getString("professor_cpf")!= null) || (record.getString("professor_nome")!=null)){
                        String cpf=null;
                        String nome=null;
                        String sobrenome=null;

                        if(record.getString("professor_cpf") != null){
                            cpf = record.getString("professor_cpf");
                            if(cpf.length()>11){
                                cpf = cpf.replace(".","");
                                cpf = cpf.replace("-","");
                            }
                        }

                        if(record.getString("professor_nome")!=null){
                            String nomeCompleto = record.getString("professor_nome");
                            nome = nomeCompleto.substring(0, nomeCompleto.indexOf(' '));
                            sobrenome = nomeCompleto.substring(nomeCompleto.indexOf(' ') + 1);
                        }
                        Professor professor = professorService.findByNomeAndSobrenomeOrCpf(nome,sobrenome,cpf);
                        if(professor!=null){
                            Set<Professor> professorSet = new HashSet<>(disciplina.getProfessores());
                            professorSet.add(professor);
                            List<Professor> professorList = new ArrayList<>(professorSet);
                            disciplina.setProfessores(professorList);
                        }else{
                            errorLine.put("nome", record.getString("nome"));
                            errorLine.put("codMoodle", record.getString("codMoodle"));
                            errorLine.put("professor_nome", record.getString("professor_nome"));
                            errorLine.put("professor_cpf", record.getString("professor_cpf"));
                            errorLine.put("motivo", "Professor não encontrado no banco de dados");
                            naoExistem++;
                        }
                    }
                    if(disciplina.getNome()==null){
                        errorLine.put("nome", record.getString("nome"));
                        errorLine.put("codMoodle", record.getString("codMoodle"));
                        errorLine.put("professor_nome", record.getString("professor_nome"));
                        errorLine.put("professor_cpf", record.getString("professor_cpf"));
                        errorLine.put("motivo", "Disciplina com nome vazio");
                        inseridas--;
                    }else{
                        if(disciplinaDB!=null){
                            if(Objects.equals(disciplina.getCodMoodle(),disciplinaDB.getCodMoodle()) &&
                                    Objects.equals(disciplina.getProfessores(),disciplinaDB.getProfessores()))
                            {
                                atualizadas--;
                            }else{
                                disciplinaRepository.save(disciplina);
                            }
                        }else{
                            disciplinaRepository.save(disciplina);
                        }
                    }
                }else{
                    errorLine.put("nome", record.getString("nome"));
                    errorLine.put("codMoodle", record.getString("codMoodle"));
                    errorLine.put("professor_nome", record.getString("professor_nome"));
                    errorLine.put("professor_cpf", record.getString("professor_cpf"));
                    errorLine.put("motivo", "Disciplina com nome ou codigo vazio");
                    erros++;
                }
            }catch(IllegalArgumentException e){
                throw new WrongCollumnsException("O arquivo deve conter as colunas nome, codMoodle, professor_cpf e professor_nome");
            }
            if(!errorLine.isEmpty()){
                errorFile.add(errorLine);
            }
        }
        return criaMessageResponseImport(inseridas,atualizadas,erros,naoExistem,errorFile);

    }
    public MessageResponseDTO criaDisciplina (DisciplinaDTO disciplinaDTO) throws AlreadyExistsException{
        if(disciplinaRepository.findByCodMoodle(disciplinaDTO.getCodMoodle()) != null){
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
    public Disciplina findByNomeOrCodMoodle(String nome,String codMoodle){
        return disciplinaRepository.findByNomeOrCodMoodle(nome,codMoodle);
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
