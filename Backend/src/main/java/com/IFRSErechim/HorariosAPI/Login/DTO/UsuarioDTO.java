package com.IFRSErechim.HorariosAPI.Login.DTO;

import com.IFRSErechim.HorariosAPI.Login.Domain.Usuario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;
import java.util.Collection;
import java.util.stream.Collectors;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO implements Serializable {

    private Long id;
    @NotEmpty
    private String name;
    @NotEmpty
    private String username;

    private String password;

    private Boolean admin;
    //private Collection<RoleDTO> roles;

    public UsuarioDTO(Usuario entity){
        id = entity.getId();
        name = entity.getName();
        username = entity.getUsername();
        admin = entity.getAdmin();
    }
}
