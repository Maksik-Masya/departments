package com.aimprosoft.departments.controller;

import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.service.DepartmentService;
import com.aimprosoft.departments.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

/**
 * Created by max on 24.04.16.
 */

@Controller
public class EmployeeController {

    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private EmployeeService employeeService;

    @RequestMapping(value = "/listEmployee")
    public ModelAndView listEmployees(@RequestParam(required = false) Integer departmentId) {
        ModelAndView modelAndView = new ModelAndView("listEmployee");
        Department department = departmentService.getDepartmentById(departmentId);
        String department_name = department.getName();
        List employeeList = employeeService.getEmployeeByDepartmentId(department);

        modelAndView.addObject("id_department", departmentId);
        modelAndView.addObject("employees", employeeList);
        modelAndView.addObject("department_name", department_name);
        modelAndView.addObject("departmentId", departmentId);
        return modelAndView;
    }
}
