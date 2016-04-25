package com.aimprosoft.departments.controller;

import com.aimprosoft.departments.exception.NotValidValueException;
import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.model.Employee;
import com.aimprosoft.departments.service.DepartmentService;
import com.aimprosoft.departments.service.EmployeeService;
import com.aimprosoft.departments.utils.StringFieldConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.Date;
import java.util.List;
import java.util.Map;

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

    @RequestMapping(value = "/addEditEmployee")
    public ModelAndView addOrEditEmployee(@RequestParam(required = false) Integer id,
                                          @RequestParam(required = false) Integer id_department) {
        ModelAndView modelAndView = new ModelAndView("employee");
        if (id != null) {
            Employee employee = employeeService.getEmployeeById(id);
            modelAndView.addObject("employee", employee);
            modelAndView.addObject("id_department", id_department);
        }
        modelAndView.addObject("departments", departmentService.getAllDepartments());
        return modelAndView;
    }

    @RequestMapping(value = "/saveEmployee")
    public ModelAndView saveEmployee(@RequestParam(required = false) String  dob,
                                     @RequestParam(required = false) String salary,
                                     @RequestParam(required = false) String id,
                                     @RequestParam(required = false) Integer id_department,
                                     @RequestParam(required = false) String firstName,
                                     @RequestParam(required = false) String lastName,
                                     @RequestParam(required = false) String email) {
        ModelAndView modelAndView = new ModelAndView("redirect:/listEmployee");
        Date convertedDOB = StringFieldConverter.convertStringToDate(dob);
        Integer convertedSalary = StringFieldConverter.convertStringToInteger(salary);
        Integer convertedId = StringFieldConverter.convertStringToInteger(id);

        Employee employee = new Employee();
        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        employee.setDob(convertedDOB);
        employee.setSalary(convertedSalary);
        employee.setEmail(email);
        if (convertedId != null) {
            employee.setId(convertedId);
        }
        try {
            modelAndView.addObject("department_name", departmentService.getDepartmentById(id_department).getName());
            modelAndView.addObject("departments", departmentService.getAllDepartments());
            modelAndView.addObject("departmentId", id_department);
            Department department = departmentService.getDepartmentById(id_department);
            employee.setDepartment(department);
            employeeService.addOrUpdateEmployee(employee);
            return modelAndView;
        } catch (NotValidValueException e) {
            Map<String, String> errors = e.getErrorMap();
            modelAndView.addObject("errors", errors);
            modelAndView.addObject("employee", employee);
            modelAndView.setViewName("employee");
            return modelAndView;
        }
    }

    @RequestMapping(value = "/delEmployee")
    public ModelAndView deleteEmployee(@RequestParam(required = false) Integer id,
                                       @RequestParam(required = false) Integer id_department) {
        ModelAndView modelAndView = new ModelAndView("redirect:/listEmployee");
        Employee employee = employeeService.getEmployeeById(id);
        employeeService.deleteEmployee(employee);
        modelAndView.addObject("departmentId", id_department);
        return modelAndView;
    }
}
