package com.IFRSErechim.HorariosAPI.Turma;

import com.IFRSErechim.HorariosAPI.Exception.AlreadyExistsException;
import com.IFRSErechim.HorariosAPI.Response.StandardError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.time.Instant;

@ControllerAdvice
public class TurmaExceptionHandler {

    @ExceptionHandler(AlreadyExistsException.class)
    public ResponseEntity<StandardError> turmaAlreadyExists(AlreadyExistsException e, HttpServletRequest request) {
        StandardError err = new StandardError(
                Instant.now(),
                HttpStatus.BAD_REQUEST.value(),
                "Unique constraint violation turma",
                e.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(err);
    }
}
