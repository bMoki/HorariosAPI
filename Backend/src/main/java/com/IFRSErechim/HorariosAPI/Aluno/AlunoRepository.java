package com.IFRSErechim.HorariosAPI.Aluno;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AlunoRepository extends JpaRepository<Aluno,Long> {
    @Query(value= "SELECT COUNT(*) FROM aluno WHERE cpf = ?", nativeQuery = true)
    Integer findByCpf(String cpf);
}
