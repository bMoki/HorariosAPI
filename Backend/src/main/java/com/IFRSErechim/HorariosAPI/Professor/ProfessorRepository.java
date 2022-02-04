package com.IFRSErechim.HorariosAPI.Professor;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


@Repository
public interface ProfessorRepository extends JpaRepository<Professor,Long> {
    @Query(value = "SELECT COUNT(*) FROM professor_disciplina where professor_id = ?",nativeQuery = true)
    Integer ProfessorHasReference(Long id);

    @Query(value= "SELECT IFNULL((SELECT id FROM professor WHERE cpf = ?), 0) as id", nativeQuery = true)
    Long findByCpf(String cpf);

    @Query("SELECT p FROM Professor p WHERE (p.nome = ?1 AND p.sobrenome = ?2) OR p.cpf = ?3")
    Professor findByNomeAndSobrenomeOrCpf(String nome, String sobrenome, String cpf);

    @Query(value = "SELECT * FROM professor WHERE nome LIKE %:search% OR sobrenome LIKE %:search% OR email LIKE %:search% OR cpf LIKE %:search% OR siape LIKE %:search%",
            countQuery = "SELECT count(*) FROM professor WHERE nome LIKE %:search% OR sobrenome LIKE %:search% OR email LIKE %:search% OR cpf LIKE %:search% OR siape LIKE %:search%",
            nativeQuery = true)
    Page<Professor> findAllProfessores(Pageable pageable,@Param("search") String search );



}
