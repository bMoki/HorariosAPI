package com.IFRSErechim.HorariosAPI.Curso;

import lombok.Data;

@Data
public class CursoID {
    private  Long id;

    public CursoID(Curso entity){
        id = entity.getId();
    }
}
