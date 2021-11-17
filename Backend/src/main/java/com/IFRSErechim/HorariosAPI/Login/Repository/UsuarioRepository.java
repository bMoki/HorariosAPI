package com.IFRSErechim.HorariosAPI.Login.Repository;

import com.IFRSErechim.HorariosAPI.Login.Domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsername(String username);

    @Query(value= "SELECT COUNT(*) FROM usuario WHERE username = ?", nativeQuery = true)
    Integer isUsernameRegistered(String username);
}
