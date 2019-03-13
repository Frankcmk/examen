package com.example.examen.modelo;


import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
public class Cita{

    private String asunto;
    private String hora;
    private String fecha;
    private String doctor;
    private Date fechacita;


}
