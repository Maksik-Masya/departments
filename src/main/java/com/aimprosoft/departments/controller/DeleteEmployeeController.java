package com.aimprosoft.departments.controller;

/**
 * Created on 06.04.16.
 */

import com.aimprosoft.departments.model.Employee;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import com.aimprosoft.departments.service.EmployeeService;
import com.aimprosoft.departments.utils.StringFieldConverter;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component(value = "/delEmployee")
public class DeleteEmployeeController implements InternalController {

    @Autowired
    private EmployeeService employeeService;

    @Override
    public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Integer id = StringFieldConverter.convertStringToInteger(request.getParameter("id"));
        Integer id_department = StringFieldConverter.convertStringToInteger(request.getParameter("id_department"));
        try {
            Employee employee = employeeService.getEmployeeById(id);
            employeeService.deleteEmployee(employee);
            response.sendRedirect("/listEmployee?departmentId="+id_department);
        } catch (HibernateException e) {
            response.sendRedirect("/error");
        }
    }
}
