package com.aimprosoft.departments.controller;

import com.aimprosoft.departments.exception.NotValidValueException;
import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.model.Employee;
import com.aimprosoft.departments.service.DepartmentService;
import com.aimprosoft.departments.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.text.SimpleDateFormat;
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

    @InitBinder
    public void initBinder(WebDataBinder binder) {
        binder.addCustomFormatter(new DateFormatter("yyyy-MM-dd"));
    }

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

    @RequestMapping(value = "/saveEmployee", method = RequestMethod.POST)
    public ModelAndView saveEmployee(@RequestParam(required = false) Integer id_department,
                                     Employee employee, BindingResult bindingResult) {
        ModelAndView modelAndView = new ModelAndView("redirect:/listEmployee");
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
    public ModelAndView deleteEmployee(Employee employee,
                                       @RequestParam(required = false) Integer id_department) {
        ModelAndView modelAndView = new ModelAndView("redirect:/listEmployee");
        employeeService.deleteEmployee(employee);
        modelAndView.addObject("departmentId", id_department);
        return modelAndView;
    }
}
