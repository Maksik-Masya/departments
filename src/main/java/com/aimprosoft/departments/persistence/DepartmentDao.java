package com.aimprosoft.departments.persistence;

/**
 * Created on 06.04.16.
 */


import com.aimprosoft.departments.model.Department;

import java.util.List;

public interface DepartmentDao {

    void addOrUpdateDepartment(Department department);

    void deleteDepartment(Department department);

    List<Department> getAllDepartments();

    Department getDepartmentByName(String name);

    Department getDepartmentById(Integer departmentId);
}
