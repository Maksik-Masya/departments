package com.aimprosoft.departments.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import java.sql.SQLException;

/**
 * Created by max on 24.04.16.
 */

@ControllerAdvice
public class ExceptionController {
    @ExceptionHandler(SQLException.class)
    public String handleException(Exception e) {
        return "redirect:/errorPage";
    }
}
