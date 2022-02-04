package com.IFRSErechim.HorariosAPI.Login.Repository;

import com.IFRSErechim.HorariosAPI.Login.Domain.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsername(String username);

    @Query(value= "SELECT COUNT(*) FROM usuario WHERE username = ?", nativeQuery = true)
    Integer isUsernameRegistered(String username);

    @Query(value = "SELECT * FROM usuario WHERE name LIKE %:search% OR username LIKE %:search%",
        countQuery = "SELECT COUNT(*) FROM usuario WHERE name LIKE %:search% OR username LIKE %:search%",
        nativeQuery = true)
    Page<Usuario> findAllUsuarios(Pageable pageable, @Param(value = "search")String search);

}
