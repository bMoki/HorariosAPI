package com.IFRSErechim.HorariosAPI.Login.Domain;

import com.IFRSErechim.HorariosAPI.Login.DTO.RoleDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(nullable = false,unique = true)
    private String name;

    public Role(RoleDTO entity){
        id = entity.getId();
        name = entity.getName();
    }
}
