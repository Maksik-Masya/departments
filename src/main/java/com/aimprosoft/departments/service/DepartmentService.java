package com.aimprosoft.departments.service;

import com.aimprosoft.departments.exception.NotValidValueException;
import com.aimprosoft.departments.model.Department;

import java.util.List;

/**
 * Created on 06.04.16.
 */
public interface DepartmentService {

    void addOrUpdateDepartment(Department department) throws NotValidValueException;

    void deleteDepartment(Department department);

    List<Department> getAllDepartments();

    Department getDepartmentById(Integer departmentId);

    Department getDepartmentByName(String name);
}
