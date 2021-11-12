package com.IFRSErechim.HorariosAPI.Login.Repository;


import com.IFRSErechim.HorariosAPI.Login.Domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(String name);
}
