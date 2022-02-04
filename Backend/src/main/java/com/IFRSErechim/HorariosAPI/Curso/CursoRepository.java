package com.IFRSErechim.HorariosAPI.Curso;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface CursoRepository extends JpaRepository<Curso,Long> {
    @Query(value = "SELECT COUNT(*) FROM curso_disciplina where curso_id = ?",nativeQuery = true)
    Integer CursoHasReference(Long id);

    @Query(value = "SELECT COUNT(nome) FROM curso WHERE UPPER(nome) = UPPER(?)",nativeQuery = true)
    Integer findByNome(String nome);

    @Query(value = "SELECT * FROM curso WHERE nome LIKE %:search%",
        countQuery = "SELECT count(*) FROM curso WHERE nome LIKE %:search%",
        nativeQuery = true)
    Page<Curso> findAllCursos(Pageable pageable, @Param(value = "search")String search);

}
