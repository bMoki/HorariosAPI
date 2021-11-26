package com.IFRSErechim.HorariosAPI.Curso;

import com.IFRSErechim.HorariosAPI.Exception.AlreadyExistsException;
import com.IFRSErechim.HorariosAPI.Exception.DeleteException;
import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import com.IFRSErechim.HorariosAPI.Turma.Turma;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    @Transactional(readOnly = true)
    public Page<CursoDTO> findAll(Pageable pageable){
        Page<Curso> result = cursoRepository.findAll(pageable);
        return result.map(x -> new CursoDTO(x));
    }

    @Transactional(readOnly = true)
    public CursoDTO findById(Long id) throws NotFoundException {
        Curso curso = verifyIfExists(id);

        return new CursoDTO(curso);
    }

    public MessageResponseDTO criaCurso (CursoDTO cursoDTO) throws AlreadyExistsException {
        if(cursoRepository.findByNome(cursoDTO.getNome()) > 0){
            throw new AlreadyExistsException("Curso já cadastrado!");
        }
        Curso salvarCurso = new Curso(cursoDTO);

        Curso CursoSalvo = cursoRepository.save(salvarCurso);
        for(int i=0; i<CursoSalvo.getQuantidadeTurma();i++){

            Turma turma = new Turma();
            turma.setNome("Semestre "+(i+1));
            turma.setCurso(CursoSalvo);

            CursoSalvo.addTurma(turma);
        }
        Curso CursoSalvoComTurmas = cursoRepository.save(CursoSalvo);

        return criaMessageResponse("Curso "+CursoSalvoComTurmas.getNome()+" cadastrado!");
    }

    public MessageResponseDTO UpdateById(Long id,CursoDTO cursoDTO) throws NotFoundException{
            Curso curso = verifyIfExists(id);
            Curso cursoToUpdate = new Curso(cursoDTO);

            cursoToUpdate.setTurmas(curso.getTurmas());

            Integer quantidade = curso.getQuantidadeTurma();
            Integer quantidadeAlterada = cursoToUpdate.getQuantidadeTurma();

            if(quantidade != quantidadeAlterada){
                Integer dif = quantidadeAlterada - quantidade;
                if(dif>0){
                    for(int i=0; i<dif;i++){

                        Turma turma = new Turma();
                        turma.setNome("Semestre "+ (curso.getQuantidadeTurma()+(i+1)));
                        turma.setCurso(cursoToUpdate);

                        cursoToUpdate.addTurma(turma);
                    }
                }else{
                    dif = dif*-1;
                    for(int i=0;i<dif;i++){
                        Integer index = cursoToUpdate.getTurmas().size()-1;
                        Turma removeTurma = cursoToUpdate.getTurmas().get(index);
                        cursoToUpdate.removeTurma(removeTurma);
                    }

                }
            }

            Curso updatedCurso = cursoRepository.save(cursoToUpdate);
            return criaMessageResponse("Curso "+updatedCurso.getNome()+" atualizado!");
    }

     public MessageResponseDTO delete(Long id) throws NotFoundException, DeleteException {
                Curso cursoToDelete = verifyIfExists(id);
                if(cursoRepository.CursoHasReference(id) > 0){
                    throw new DeleteException(id,"Curso");
                }

                cursoRepository.deleteById(id);
                return criaMessageResponse("Curso "+cursoToDelete.getNome()+" deletado!");
    }


    private Curso verifyIfExists(Long id) throws NotFoundException {
            return cursoRepository.findById(id)
                    .orElseThrow(() -> new NotFoundException("Curso"));
    }

    private MessageResponseDTO criaMessageResponse(String message) {
            return MessageResponseDTO
                    .builder()
                    .message(message)
                    .build();
    }
}
