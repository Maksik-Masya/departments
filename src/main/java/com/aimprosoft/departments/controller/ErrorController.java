package com.aimprosoft.departments.controller;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created on 13.04.16.
 */

@Component(value = "/error")
public class ErrorController implements InternalController {
    @Override
    public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("jsp/errorPage.jsp").forward(request, response);
    }
}
