package com.IFRSErechim.HorariosAPI.Disciplina;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DisciplinaRepository extends JpaRepository<Disciplina,Long> {
    @Query(value = "SELECT COUNT(*) FROM professor_disciplina pd " +
            "right join curso_disciplina cd on cd.disciplina_id = pd.disciplina_id " +
            "where cd.disciplina_id = ?",nativeQuery = true)
    Integer DisciplinaHasReference(Long id);

    @Query(value = "SELECT COUNT(nome) FROM disciplina WHERE UPPER(nome) = UPPER(?)",nativeQuery = true)
    Integer findByNome(String nome);

}
