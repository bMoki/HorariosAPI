package com.IFRSErechim.HorariosAPI.Disciplina;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface DisciplinaRepository extends JpaRepository<Disciplina,Long> {
    @Query(value = "SELECT CASE WHEN EXISTS ( " +
            "SELECT ad.disciplina_id ,cd.disciplina_id FROM disciplina d " +
            "LEFT JOIN aluno_disciplina ad on ad.disciplina_id = d.id " +
            "LEFT JOIN curso_disciplina cd on cd.disciplina_id = d.id " +
            "WHERE d.id = ? AND (cd.disciplina_id IS NOT NULL OR ad.disciplina_id IS NOT NULL) " +
            ") THEN true ELSE false END Result",nativeQuery = true)
    Integer DisciplinaHasReference(Long id);

    @Query(value = "SELECT COUNT(nome) FROM disciplina WHERE UPPER(nome) = UPPER(?)",nativeQuery = true)
    Integer findByNome(String nome);

}
