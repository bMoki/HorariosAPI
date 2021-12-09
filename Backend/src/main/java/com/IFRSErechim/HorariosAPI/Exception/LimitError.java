package com.IFRSErechim.HorariosAPI.Exception;

import java.util.List;

public class LimitError extends Exception{
    public LimitError(List<Integer> linhasError) {
        super("Erro ao importar as linhas " +linhasError.toString());
    }
}
