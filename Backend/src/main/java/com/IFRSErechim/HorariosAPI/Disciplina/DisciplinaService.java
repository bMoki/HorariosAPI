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

import java.nio.charset.StandardCharsets;
import java.time.LocalDate;
import java.util.*;


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

    public MessageResponseDTO importDisciplina (MultipartFile file) throws  ParseError, WrongCollumnsException {
        Integer linhasAtualizadas=0;
        Integer linhasInseridas=0;

        List<Integer> linhasError = new ArrayList<>();
        List<Integer> linhasProfessorNaoExiste = new ArrayList<>();
        List<Record> parseAllRecords = new ParsedRecords(file).getRecords();
        for(int i=0;i<parseAllRecords.size();i++){
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

                    Disciplina disciplinaDB = disciplinaRepository.findByNomeOrCodMoodle(disciplina.getNome(), disciplina.getCodMoodle());
                    if(disciplinaDB != null){
                        disciplina.setId(disciplinaDB.getId());
                        disciplina.setNome(disciplinaDB.getNome());
                        disciplina.setProfessores(disciplinaDB.getProfessores());
                        linhasAtualizadas++;
                    }else{
                        linhasInseridas++;
                    }

                    if((record.getString("professor_cpf")!= null) || (record.getString("professor_nome")!=null)){
                        String cpf=null;
                        String nome=null;
                        String sobrenome=null;

                        if(record.getString("professor_cpf") != null){
                            cpf = record.getString("professor_cpf");
                            if(cpf.length()==11){
                                StringBuffer cpfFormated = new StringBuffer(cpf);
                                cpfFormated.insert(2 + 1, ".");
                                cpfFormated.insert(6 + 1, ".");
                                cpfFormated.insert(10 + 1, "-");
                                cpf = cpfFormated.toString();
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
                            linhasProfessorNaoExiste.add((i+2));
                        }
                    }
                    if(disciplina.getNome()==null){
                        linhasError.add((i+2));
                        linhasInseridas--;
                    }else{
                        if(disciplinaDB!=null){
                            if(Objects.equals(disciplina.getCodMoodle(),disciplinaDB.getCodMoodle()) &&
                                    Objects.equals(disciplina.getProfessores(),disciplinaDB.getProfessores()))
                            {
                                linhasAtualizadas--;
                            }else{
                                disciplinaRepository.save(disciplina);
                            }
                        }else{
                            disciplinaRepository.save(disciplina);
                        }
                    }
                }else{
                    linhasError.add((i+2));
                }
            }catch(IllegalArgumentException e){
                throw new WrongCollumnsException("O arquivo deve conter as colunas nome, codMoodle, professor_cpf e professor_nome");
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
            return criaMessageResponseWithWarning("Inserção de "+linhasInseridas+" e atualização de "+linhasAtualizadas+" disciplinas concluída!",warn );
        }
        return criaMessageResponse("Inserção de "+linhasInseridas+" e atualização de "+linhasAtualizadas+" disciplinas concluída!");

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

    private MessageResponseDTO criaMessageResponseWithWarning(String message,String warning) {
        return MessageResponseDTO
                .builder()
                .message(message)
                .warning(warning)
                .build();
    }
}
