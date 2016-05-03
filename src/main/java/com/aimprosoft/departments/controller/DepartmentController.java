package com.aimprosoft.departments.controller;

import com.aimprosoft.departments.exception.NotValidValueException;
import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.service.DepartmentService;
import com.aimprosoft.departments.utils.JsonResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.UriComponentsBuilder;

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
    @ResponseBody
    public Department addOrEditDepartment(@RequestParam(required = false) Integer departmentId) {
        Department department = null;
        if (departmentId != null) {
            department = departmentService.getDepartmentById(departmentId);
        }
        return department;
    }

    @RequestMapping(value = "/saveDepartment", method = RequestMethod.POST)
    @ResponseBody
    public JsonResponse saveDepartment(@RequestBody Department department) {
        JsonResponse jsonResponse = new JsonResponse();
        try {
            departmentService.addOrUpdateDepartment(department);
        } catch (NotValidValueException e) {
            Map<String, String> errors = e.getErrorMap();
            jsonResponse.setStatus("FAIL");
            jsonResponse.setResult(errors);
            return jsonResponse;
        }
        jsonResponse.setStatus("SUCCESS");
        return jsonResponse;
    }

    @RequestMapping(value = "/delDepartment", method = RequestMethod.POST)
    @ResponseBody
    public Department deleteDepartment(@RequestParam Integer departmentId) {
        Department department = departmentService.getDepartmentById(departmentId);
        departmentService.deleteDepartment(department);
        return department;
    }

    @RequestMapping(value = "/myDepartment", method = RequestMethod.GET)
    @ResponseBody
    public List<Department> myDepartments() {
        return departmentService.getAllDepartments();
    }
}
