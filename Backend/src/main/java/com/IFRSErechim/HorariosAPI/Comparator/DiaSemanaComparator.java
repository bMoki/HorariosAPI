package com.IFRSErechim.HorariosAPI.Comparator;

import com.IFRSErechim.HorariosAPI.Horario.HorarioDTO;

import java.util.Comparator;

public class DiaSemanaComparator implements Comparator<HorarioDTO> {
    public int compare(HorarioDTO h1, HorarioDTO h2)
    {
        return h1.getDiaSemana().compareTo(h2.getDiaSemana());
    }
}
