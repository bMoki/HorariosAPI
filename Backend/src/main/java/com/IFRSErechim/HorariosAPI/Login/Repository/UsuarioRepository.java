package com.IFRSErechim.HorariosAPI.Login.Repository;

import com.IFRSErechim.HorariosAPI.Login.Domain.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByUsername(String username);
}
