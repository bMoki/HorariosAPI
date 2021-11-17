package com.IFRSErechim.HorariosAPI.Login.Domain;


import com.IFRSErechim.HorariosAPI.Horario.Horario;
import com.IFRSErechim.HorariosAPI.Login.DTO.UsuarioDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.stream.Collectors;

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
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();


    public Usuario(UsuarioDTO entity){
        id = entity.getId();
        name = entity.getName();
        username = entity.getUsername();
        password = entity.getPassword();
        roles = entity.getRoles().stream().map(x-> new Role(x)).collect(Collectors.toList());
    }
}
