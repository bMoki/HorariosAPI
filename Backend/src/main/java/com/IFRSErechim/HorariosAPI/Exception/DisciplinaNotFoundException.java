package com.IFRSErechim.HorariosAPI.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND,reason = "Disciplina não existe")
public class DisciplinaNotFoundException extends Exception {
    public DisciplinaNotFoundException(Long id) {
        super("Não foi possível achar disciplina com ID " + id);
    }
}
