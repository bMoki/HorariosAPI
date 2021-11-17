package com.IFRSErechim.HorariosAPI.Login.DTO;

import com.IFRSErechim.HorariosAPI.Login.Domain.Usuario;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import java.io.Serializable;

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

    public UsuarioDTO(Usuario entity){
        id = entity.getId();
        name = entity.getName();
        username = entity.getUsername();
        admin = entity.getAdmin();
    }
}
