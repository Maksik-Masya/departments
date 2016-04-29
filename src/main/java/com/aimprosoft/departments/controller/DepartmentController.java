package com.aimprosoft.departments.controller;

import com.aimprosoft.departments.exception.NotValidValueException;
import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

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
    public @ResponseBody Department addOrEditDepartment(@RequestParam(required = false) Integer departmentId) {
        Department department = null;
        if (departmentId != null) {
            department = departmentService.getDepartmentById(departmentId);

        }
        return department;
    }

    @RequestMapping(value = "/saveDepartment", method = RequestMethod.POST)
    public ResponseBody  saveDepartment(Department department) {


        try {
            departmentService.addOrUpdateDepartment(department);
        } catch (NotValidValueException e) {
            e.printStackTrace();
        }


        return null;
    }

    @RequestMapping(value = "/delDepartment", method = RequestMethod.POST)
    public @ResponseBody Department deleteDepartment(@RequestParam(required = false) Integer departmentId) {
        Department department = departmentService.getDepartmentById(departmentId);
        departmentService.deleteDepartment(department);
        return department;
    }

    @RequestMapping(value = "/myDepartment", method = RequestMethod.GET)
    public @ResponseBody List<Department> myDepartments() {
        Department department = new Department();
        department.setDepartmentid(100);
        department.setName("testname");
        List<Department> list = departmentService.getAllDepartments();
        return list;
    }
}
