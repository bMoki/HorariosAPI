package com.IFRSErechim.HorariosAPI.Aluno;

import com.IFRSErechim.HorariosAPI.Disciplina.Disciplina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AlunoRepository extends JpaRepository<Aluno,Long> {
    @Query(value= "SELECT COUNT(*) FROM aluno WHERE cpf = ?", nativeQuery = true)
    Integer findByCpf(String cpf);

    @Query("SELECT a FROM Aluno a WHERE a.nomeCompleto = ?1 OR a.cpf = ?2")
    Aluno findByNomeOrCpf(String nome, String cpf);

}
