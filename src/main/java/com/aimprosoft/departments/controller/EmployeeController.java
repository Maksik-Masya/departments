package com.aimprosoft.departments.controller;

import com.aimprosoft.departments.exception.NotValidValueException;
import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.model.Employee;
import com.aimprosoft.departments.service.DepartmentService;
import com.aimprosoft.departments.service.EmployeeService;
import com.aimprosoft.departments.utils.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

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
    public List listEmployees(@RequestParam(required = false) Integer departmentId) {
        Department department = departmentService.getDepartmentById(departmentId);
        List employees = employeeService.getEmployeeByDepartmentId(department);
        return employees;
    }

    @RequestMapping(value = "/addEditEmployee")
    @ResponseBody
    public Employee addOrEditEmployee(@RequestParam(required = false) Integer id) {
        Employee employee = null;
        if (id != null) {
            employee = employeeService.getEmployeeById(id);
        }
        return employee;
    }

    @RequestMapping(value = "/saveEmployee", method = RequestMethod.POST)
    @ResponseBody
    public JsonResponse saveEmployee(@RequestBody Employee employee, BindingResult bindingResult) {
        JsonResponse jsonResponse = new JsonResponse();
        try {
            employeeService.addOrUpdateEmployee(employee);
            jsonResponse.setStatus("SUCCESS");
            return jsonResponse;
        } catch (NotValidValueException e) {
            Map<String, String> errors = e.getErrorMap();
            jsonResponse.setStatus("FAIL");
            jsonResponse.setResult(errors);
            return jsonResponse;
        }
    }

    @RequestMapping(value = "/delEmployee", method = RequestMethod.POST)
    @ResponseBody
    public Employee deleteEmployee(@RequestParam Integer id) {
//        ModelAndView modelAndView = new ModelAndView("redirect:/listEmployee");
        Employee employee = employeeService.getEmployeeById(id);
        employeeService.deleteEmployee(employee);
//        modelAndView.addObject("departmentId", id_department);
//        return modelAndView;
        return employee;
    }
}
