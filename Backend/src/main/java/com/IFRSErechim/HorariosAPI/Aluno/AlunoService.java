package com.IFRSErechim.HorariosAPI.Aluno;

import com.IFRSErechim.HorariosAPI.Exception.AlreadyExistsException;
import com.IFRSErechim.HorariosAPI.Exception.DeleteException;
import com.IFRSErechim.HorariosAPI.Exception.NotFoundException;
import com.IFRSErechim.HorariosAPI.Response.MessageResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    public Page<AlunoDTO> findAll(Pageable pageable){
        Page<Aluno> result = alunoRepository.findAll(pageable);
        return result.map(x -> new AlunoDTO(x));
    }

    public AlunoDTO findById(Long id) throws NotFoundException {
        Aluno aluno = verifyIfExists(id);

        return new AlunoDTO(aluno);
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
}
