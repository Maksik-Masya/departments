package com.aimprosoft.departments.service;

import com.aimprosoft.departments.exception.NotValidValueException;
import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.model.Employee;

import java.util.List;

/**
 * Created on 07.04.16.
 */

public interface EmployeeService {

    void addOrUpdateEmployee(Employee employee) throws NotValidValueException;

    void deleteEmployee(Employee employee);

    List<Employee> getAllEmployees();

    Employee getEmployeeById(int id);

    Employee getEmployeeByEmail(String email);

    List getEmployeeByDepartmentId(Department department);

}
