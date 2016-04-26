package com.aimprosoft.departments.controller;

import com.aimprosoft.departments.exception.NotValidValueException;
import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Map;

/**
 * Created by max on 24.04.16.
 */

@Controller
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView departmentList() {
        ModelAndView modelAndView = new ModelAndView("listDepartment");
        List<Department> departmentList = departmentService.getAllDepartments();
        modelAndView.addObject("departments", departmentList);
        return modelAndView;
    }

    @RequestMapping(value = "/addEditDepartment", method = RequestMethod.GET)
    public ModelAndView addOrEditDepartment(@RequestParam(required = false) Integer departmentId) {
        ModelAndView modelAndView = new ModelAndView("department");
        if (departmentId != null) {
            Department department = departmentService.getDepartmentById(departmentId);
            modelAndView.addObject("department", department);
        }
        return modelAndView;
    }

    @RequestMapping(value = "/saveDepartment", method = RequestMethod.POST)
    public ModelAndView saveDepartment(Department department) {
        ModelAndView modelAndView = new ModelAndView("redirect:/");
        try {
            departmentService.addOrUpdateDepartment(department);
            return modelAndView;
        } catch (NotValidValueException e) {
            Map<String, String> errors = e.getErrorMap();
            modelAndView.addObject("errors", errors);
            modelAndView.addObject("department", department);
            modelAndView.setViewName("department");
            return modelAndView;
        }
    }

    @RequestMapping(value = "/delDepartment", method = RequestMethod.POST)
    public ModelAndView deleteDepartment(@RequestParam(required = false) Integer departmentId) {
        ModelAndView modelAndView = new ModelAndView("redirect:/");
        Department department = departmentService.getDepartmentById(departmentId);
        departmentService.deleteDepartment(department);
        return modelAndView;
    }
}
