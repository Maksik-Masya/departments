package com.aimprosoft.departments.service.hibernate;

import com.aimprosoft.departments.exception.NotValidValueException;
import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.model.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aimprosoft.departments.persistence.EmployeeDao;
import com.aimprosoft.departments.service.EmployeeService;
import com.aimprosoft.departments.utils.CustomValidator;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created on 15.04.16.
 */
@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeDao employeeDao;

    @Autowired
    private CustomValidator customValidator;

    @Transactional
    public void addOrUpdateEmployee(Employee employee) throws NotValidValueException {
        customValidator.validate(employee);
        employeeDao.addOrUpdateEmployee(employee);
    }

    @Transactional
    public void deleteEmployee(Employee employee) {
        employeeDao.deleteEmployee(employee);
    }

    @Transactional(readOnly = true)
    public List<Employee> getAllEmployees() {
        return null;
    }

    @Transactional(readOnly = true)
    public Employee getEmployeeById(int id) {
        return employeeDao.getEmployeeById(id);
    }

    @Transactional(readOnly = true)
    public Employee getEmployeeByEmail(String email) {
        return employeeDao.getEmployeeByEmail(email);
    }

    @Transactional(readOnly = true)
    public List getEmployeeByDepartmentId(Department department) {
        return employeeDao.getEmployeeByDepartmentId(department);
    }
}
