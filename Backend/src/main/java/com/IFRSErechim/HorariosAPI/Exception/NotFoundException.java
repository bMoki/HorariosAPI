package com.IFRSErechim.HorariosAPI.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND,reason = "entity does not exists")
public class NotFoundException extends Exception {
    public NotFoundException(String entidade) {
        super("Não foi possível achar " + entidade);
    }
}
