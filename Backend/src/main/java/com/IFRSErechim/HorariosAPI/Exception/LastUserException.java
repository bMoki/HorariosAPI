package com.IFRSErechim.HorariosAPI.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST,reason = "last user")
public class LastUserException extends Exception {
    public LastUserException() {
        super("Só existe este usuário administrador cadastrado!");
    }
}
