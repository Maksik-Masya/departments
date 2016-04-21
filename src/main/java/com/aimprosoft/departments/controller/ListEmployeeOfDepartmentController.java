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
import com.aimprosoft.departments.service.EmployeeService;
import com.aimprosoft.departments.utils.StringFieldConverter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@Component(value = "/listEmployee")
public class ListEmployeeOfDepartmentController implements InternalController {

    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private EmployeeService employeeService;

    @Override
    public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Integer id_department = StringFieldConverter.convertStringToInteger(request.getParameter("departmentId"));
        try {
            Department department = departmentService.getDepartmentById(id_department);
            String department_name = department.getName();
            //List employeeList = department.getEmployees();
            List employeeList = employeeService.getEmployeeByDepartmentId(department);

            request.setAttribute("id_department", id_department);
            request.setAttribute("employees", employeeList);
            request.setAttribute("department_name", department_name);
            request.setAttribute("departmentId", id_department);
            request.getRequestDispatcher("jsp/listEmployee.jsp").forward(request, response);
        } catch (HibernateException e) {
            response.sendRedirect("/error");
        }
    }
}

