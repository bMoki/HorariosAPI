package com.IFRSErechim.HorariosAPI.Turma;

import lombok.Data;

@Data
public class TurmaID {
   private Long id;

   public TurmaID(Turma entity){
       id = entity.getId();
   }
}
