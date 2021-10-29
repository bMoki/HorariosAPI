package com.IFRSErechim.HorariosAPI.Curso;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CursoRepository extends JpaRepository<Curso,Long> {
    @Query(value = "SELECT COUNT(*) FROM curso_disciplina where curso_id = ?",nativeQuery = true)
    Integer CursoHasReference(Long id);

    @Query(value = "SELECT COUNT(nome) FROM curso WHERE UPPER(nome) = UPPER(?)",nativeQuery = true)
    Integer findByNome(String nome);

}
