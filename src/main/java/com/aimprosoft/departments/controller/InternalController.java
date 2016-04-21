package com.aimprosoft.departments.controller;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created on 06.04.16.
 */
public interface InternalController {
    void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException;
}
