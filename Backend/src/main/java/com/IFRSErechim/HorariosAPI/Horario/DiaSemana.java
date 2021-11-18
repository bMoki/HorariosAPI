package com.IFRSErechim.HorariosAPI.Horario;

public enum DiaSemana {
    SEGUNDA(0),
    TERÇA(1),
    QUARTA(2),
    QUINTA(3),
    SEXTA(4),
    SABADO(5);

    DiaSemana(Integer value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    private final Integer value;
}
