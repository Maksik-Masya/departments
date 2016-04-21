package com.aimprosoft.departments.controller;

import com.aimprosoft.departments.exception.NotValidValueException;
import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.model.Employee;
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
import java.util.Date;
import java.util.Map;

/**
 * Created on 07.04.16.
 */

@Component(value = "/saveEmployee")
public class SaveEmployeeController implements InternalController {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DepartmentService departmentService;

    @Override
    public void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Date dob = StringFieldConverter.convertStringToDate(request.getParameter("dob"));
        Integer salary = StringFieldConverter.convertStringToInteger(request.getParameter("salary"));
        Integer id = StringFieldConverter.convertStringToInteger(request.getParameter("id"));
        String notConvertedIdDepartment = request.getParameter("id_department");
        Integer id_department = StringFieldConverter.convertStringToInteger(notConvertedIdDepartment);
        Employee employee = new Employee();
        employee.setFirstName(request.getParameter("firstName"));
        employee.setLastName(request.getParameter("lastName"));
        employee.setDob(dob);
        employee.setSalary(salary);
        employee.setEmail(request.getParameter("email"));
        if (id != null) {
            employee.setId(id);
        }
        try {
            request.setAttribute("department_name", departmentService.getDepartmentById(id_department).getName());
            request.setAttribute("departments", departmentService.getAllDepartments());
            Department department = departmentService.getDepartmentById(id_department);
            employee.setDepartment(department);
            employeeService.addOrUpdateEmployee(employee);
            response.sendRedirect("/listEmployee?departmentId=" + id_department);
        } catch (NotValidValueException e) {
            Map<String, String> errors = e.getErrorMap();
            request.setAttribute("errors", errors);
            request.getRequestDispatcher("jsp/employee.jsp").forward(request, response);
        } catch (HibernateException e) {
            response.sendRedirect("/error");
        }
    }
}
