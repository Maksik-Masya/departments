package com.aimprosoft.departments.controller;

import com.aimprosoft.departments.exception.NotValidValueException;
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
import java.util.Map;

/**
 * Created on 07.04.16.
 */

@Component(value = "/saveDepartment")
public class SaveDepartmentController implements InternalController {

    @Autowired
    private DepartmentService departmentService;

    @Override
    public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String departmentId = request.getParameter("departmentId");
        Integer id = StringFieldConverter.convertStringToInteger(departmentId);
        String departmentName = request.getParameter("name");
        Department department = new Department();
        department.setName(departmentName);
        if (id != null) {
            department.setDepartmentid(id);
        }
        try {
            departmentService.addOrUpdateDepartment(department);
            response.sendRedirect("/");
        } catch (NotValidValueException e) {
            Map<String, String> errors = e.getErrorMap();
            request.setAttribute("errors", errors);
            request.setAttribute("department", department);
            request.getRequestDispatcher("jsp/department.jsp").forward(request, response);
        } catch (HibernateException e) {
            response.sendRedirect("/error");
        }
    }
}
