package com.IFRSErechim.HorariosAPI.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ProfessorNotFoundException extends Exception {

    public ProfessorNotFoundException(Long id) {
        super("Não foi possível achar professor com ID " + id);
    }
}