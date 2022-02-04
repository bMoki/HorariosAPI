package com.IFRSErechim.HorariosAPI.Aluno;

import com.IFRSErechim.HorariosAPI.Disciplina.Disciplina;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AlunoRepository extends JpaRepository<Aluno,Long> {
    @Query(value= "SELECT COUNT(*) FROM aluno WHERE cpf = ?", nativeQuery = true)
    Integer findByCpf(String cpf);

    @Query("SELECT a FROM Aluno a WHERE a.nomeCompleto = ?1 OR a.cpf = ?2")
    Aluno findByNomeOrCpf(String nome, String cpf);

    @Query(value = "SELECT * FROM aluno WHERE nome_completo LIKE %:search% OR matricula LIKE %:search% OR email LIKE %:search% OR cpf LIKE %:search%",
            countQuery = "SELECT COUNT(*) FROM aluno WHERE nome_completo LIKE %:search% OR matricula LIKE %:search% OR email LIKE %:search% OR cpf LIKE %:search%",
            nativeQuery = true)
    Page<Aluno> findAllAlunos(Pageable pageable, @Param("search") String search);

}
