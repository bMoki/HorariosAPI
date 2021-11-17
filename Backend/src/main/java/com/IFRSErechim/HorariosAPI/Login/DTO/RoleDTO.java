package com.IFRSErechim.HorariosAPI.Login.DTO;

import com.IFRSErechim.HorariosAPI.Login.Domain.Role;
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
public class RoleDTO implements Serializable {
    private Long id;
    @NotEmpty
    private String name;

    public RoleDTO(Role entity){
        id = entity.getId();
        name = entity.getName();
    }
}
