package com.aimprosoft.departments.controller;

import com.aimprosoft.departments.exception.NotValidValueException;
import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.model.Employee;
import com.aimprosoft.departments.service.DepartmentService;
import com.aimprosoft.departments.service.EmployeeService;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Controller
public class EmployeeController {

    @Autowired
    private DepartmentService departmentService;
    @Autowired
    private EmployeeService employeeService;

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.addCustomFormatter(new DateFormatter("yyyy-MM-dd"));
    }

    @RequestMapping(value = "/listEmployee", method = RequestMethod.GET)
    @ResponseBody
    public List listEmployees(@RequestParam(required = false) Integer departmentId) throws HibernateException {
        Department department = departmentService.getDepartmentById(departmentId);
        return employeeService.getEmployeeByDepartmentId(department);
    }

    @RequestMapping(value = "/saveEmployee", method = RequestMethod.POST)
    @ResponseBody
    public void saveEmployee(@RequestBody Employee employee, BindingResult bindingResult)
            throws NotValidValueException, HibernateException {
        employeeService.addOrUpdateEmployee(employee);
    }

    @RequestMapping(value = "/uniqEmployeeName", method = RequestMethod.GET)
    @ResponseBody
    public Boolean isUniqEmployeeName(@RequestParam String email, Integer id) {
        Employee employee;
        employee = employeeService.getEmployeeByEmail(email);
        return employee == null || (Objects.equals(employee.getId(), id));
    }

    @RequestMapping(value = "/delEmployee", method = RequestMethod.POST)
    @ResponseBody
    public Employee deleteEmployee(@RequestParam Integer id) throws HibernateException {
        Employee employee = employeeService.getEmployeeById(id);
        employeeService.deleteEmployee(employee);
        return employee;
    }
}
