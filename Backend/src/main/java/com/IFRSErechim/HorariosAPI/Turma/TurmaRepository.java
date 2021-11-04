package com.IFRSErechim.HorariosAPI.Turma;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface TurmaRepository extends JpaRepository<Turma,Long> {
    @Query(value = "SELECT COUNT(*) FROM turma WHERE UPPER(nomeCompleto) = UPPER(?)", nativeQuery = true)
    Integer findByNome(String nome);
}