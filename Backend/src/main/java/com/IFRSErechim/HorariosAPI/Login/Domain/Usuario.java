package com.IFRSErechim.HorariosAPI.Login.Domain;


import com.IFRSErechim.HorariosAPI.Login.DTO.UsuarioDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false,unique = true)
    private String username;
    @Column(nullable = false)
    private String password;

    private Boolean admin;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();

    public void addRoles (Collection<Role> roles){
        this.roles = roles;
    }

    public Usuario(UsuarioDTO entity){
        id = entity.getId();
        name = entity.getName();
        username = entity.getUsername();
        password = entity.getPassword();
        admin = entity.getAdmin();

//        roles = entity.getRoles().stream().map(x-> new Role(x)).collect(Collectors.toList());
    }
}
