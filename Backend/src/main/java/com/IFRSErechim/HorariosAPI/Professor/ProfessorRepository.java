package com.IFRSErechim.HorariosAPI.Professor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor,Long> {
    @Query(value = "SELECT COUNT(*) FROM professor_disciplina where professor_id = ?",nativeQuery = true)
    Integer ProfessorHasReference(Long id);

    @Query(value= "SELECT IFNULL((SELECT id FROM professor WHERE cpf = ?), 0) as id", nativeQuery = true)
    Long findByCpf(String cpf);

    @Query("SELECT p FROM Professor p WHERE (p.nome = ?1 AND p.sobrenome = ?2) OR p.cpf = ?3")
    Professor findByNomeAndSobrenomeOrCpf(String nome, String sobrenome, String cpf);
}
