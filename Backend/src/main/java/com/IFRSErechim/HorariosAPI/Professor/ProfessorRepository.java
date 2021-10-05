package com.IFRSErechim.HorariosAPI.Professor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfessorRepository extends JpaRepository<Professor,Long> {
    @Query(value = "SELECT COUNT(*) FROM professor_disciplina where professor_id = ?",nativeQuery = true)
    Integer ProfessorHasReference(Long id);

    @Query(value= "SELECT COUNT(*) FROM professor WHERE cpf = ?", nativeQuery = true)
    Integer findByCpf(String cpf);
}
