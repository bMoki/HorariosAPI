package com.IFRSErechim.HorariosAPI.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class DeleteException extends Exception {
    public DeleteException(Long id, String entidade) {
        super(entidade+" com ID "+id+" ainda está sendo referenciada e não pode ser excluída ");
    }
}
