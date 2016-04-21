package com.aimprosoft.departments.persistence;

/**
 * Created on 06.04.16.
 */

import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.model.Employee;

import java.util.List;

public interface EmployeeDao {

    void addOrUpdateEmployee(Employee employee);

    void deleteEmployee(Employee employee);

    List<Employee> getAllEmployees();

    Employee getEmployeeById(int id);

    Employee getEmployeeByEmail(String email);

    List getEmployeeByDepartmentId(Department department);

}
