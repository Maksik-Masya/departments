package com.aimprosoft.departments.controller;

import com.aimprosoft.departments.exception.NotValidValueException;
import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.service.DepartmentService;
import org.hibernate.HibernateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.Objects;

@Controller
public class DepartmentController {

    @Autowired
    private DepartmentService departmentService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public ModelAndView departmentList() {
        return new ModelAndView("index");
    }

    @RequestMapping(value = "/saveDepartment", method = RequestMethod.POST)
    @ResponseBody
    public void saveDepartment(@RequestBody Department department)
            throws NotValidValueException, HibernateException {
        departmentService.addOrUpdateDepartment(department);
    }

    @RequestMapping(value = "/uniqDepartmentName", method = RequestMethod.GET)
    @ResponseBody
    public Boolean isUniqDepartmentName(@RequestParam String name, Integer id) {
        Department department;
        department = departmentService.getDepartmentByName(name);
        return department == null || (Objects.equals(department.getDepartmentid(), id));
    }

    @RequestMapping(value = "/delDepartment", method = RequestMethod.POST)
    @ResponseBody
    public Department deleteDepartment(@RequestParam Integer departmentId) throws HibernateException {
        Department department = departmentService.getDepartmentById(departmentId);
        departmentService.deleteDepartment(department);
        return department;
    }

    @RequestMapping(value = "/listDepartments", method = RequestMethod.GET)
    @ResponseBody
    public List<Department> myDepartments() throws HibernateException {
        return departmentService.getAllDepartments();
    }
}
