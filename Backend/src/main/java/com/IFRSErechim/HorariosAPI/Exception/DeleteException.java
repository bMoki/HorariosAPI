package com.IFRSErechim.HorariosAPI.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class DeleteException extends Exception {
    public DeleteException(String entidade) {
        super(entidade+" ainda está sendo referenciada e não pode ser excluída ");
    }
}
