package com.aimprosoft.departments.controller;

/**
 * Created on 06.04.16.
 */

import com.aimprosoft.departments.model.Department;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import com.aimprosoft.departments.service.DepartmentService;
import com.aimprosoft.departments.utils.StringFieldConverter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component(value = "/delDepartment")
public class DeleteDepartmentController implements InternalController {

    @Autowired
    private DepartmentService departmentService;

    @Override
    public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        Integer departmentId = StringFieldConverter.convertStringToInteger(request.getParameter("departmentId"));
        try {
            Department department = departmentService.getDepartmentById(departmentId);
            departmentService.deleteDepartment(department);
            response.sendRedirect("/");
        } catch (HibernateException e) {
            response.sendRedirect("/error");
        }
    }
}
