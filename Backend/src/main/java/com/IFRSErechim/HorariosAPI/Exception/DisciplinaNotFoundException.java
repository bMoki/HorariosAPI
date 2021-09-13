package com.IFRSErechim.HorariosAPI.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class DisciplinaNotFoundException extends Exception {
    public DisciplinaNotFoundException(Long id) {
        super("Não foi possível achar disciplina com ID " + id);
    }
}
