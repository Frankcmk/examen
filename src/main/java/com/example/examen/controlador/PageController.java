package com.example.examen.controlador;

import com.example.examen.modelo.Cita;
import com.example.examen.modelo.Doctor;
import com.google.gson.Gson;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Controller
public class PageController {
    private List<Cita> citas = new ArrayList();
    private List<String> nombres;
    private Cita c;
    private Doctor dr;
    SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm");

    @RequestMapping(path="/principal")
    public String list(Model model){
        dr  = new Doctor();
        nombres= new ArrayList();

        nombres.add("Francisco Reyes");
        nombres.add("Javier Razo");
        nombres.add("Misael Aguilar");
        nombres.add("Oscar David Sanchez");

        dr.setNombre(nombres);

        model.addAttribute("citas",citas);
        model.addAttribute("doctores",dr);
        return "citas";
    }
    @RequestMapping(path="/calendario")
    public String saludo(Model model){

        String json = new Gson().toJson(citas);

        model.addAttribute("jsonO", json);

        return "calendario";
    }


    @PostMapping("/add")
    public String add(String asunto,String hora, String fecha,String doc) throws ParseException {
        c = new Cita();
        c.setAsunto(asunto);
        c.setHora(hora);
        c.setFecha(fecha);
        c.setDoctor(doc);
        Date aux = formatter.parse(fecha+ " " + hora);
        c.setFechacita(aux);
        citas.add(c);

        return "redirect:/principal";
    }


}
