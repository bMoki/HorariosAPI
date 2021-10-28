package com.IFRSErechim.HorariosAPI.Exception;

public class LimitHorarioExceeded extends Exception{
    public LimitHorarioExceeded(Long id) {
        super("Limite de horário atingido para turma com ID " + id);
    }
}
