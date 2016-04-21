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

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Component(value = "/")
public class ListDepartmentController implements InternalController {
    @Autowired
    private DepartmentService departmentService;
    @Override
    public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {
            List<Department> departmentList = departmentService.getAllDepartments();
            request.setAttribute("departments", departmentList);
            request.getRequestDispatcher("jsp/listDepartment.jsp").forward(request,response);
        } catch (HibernateException e) {
            response.sendRedirect("/error");
        }
    }
}
