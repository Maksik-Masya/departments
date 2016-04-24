package com.aimprosoft.departments.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by max on 24.04.16.
 */

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(Exception.class)
    public ModelAndView handleException(Exception e) {
        return new ModelAndView("errorPage");
    }
}
