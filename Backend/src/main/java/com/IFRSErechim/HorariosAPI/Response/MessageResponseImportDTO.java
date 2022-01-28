package com.IFRSErechim.HorariosAPI.Response;

import lombok.Builder;
import lombok.Data;

import java.util.HashMap;
import java.util.List;

@Data
@Builder
public class MessageResponseImportDTO {
    private Integer inseridas;
    private Integer atualizadas;
    private Integer erros;
    private Integer naoExistem;
    private List<HashMap> file;
}
