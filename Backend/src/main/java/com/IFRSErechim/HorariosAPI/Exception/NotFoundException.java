package com.IFRSErechim.HorariosAPI.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND,reason = "Disciplina não existe")
public class NotFoundException extends Exception {
    public NotFoundException(Long id) {
        super("Não foi possível achar entidade com ID " + id);
    }
}
