package com.aimprosoft.departments.service.hibernate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aimprosoft.departments.persistence.DepartmentDao;
import com.aimprosoft.departments.exception.NotValidValueException;
import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.service.DepartmentService;
import com.aimprosoft.departments.utils.CustomValidator;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created on 14.04.16.
 */

@Service
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentDao departmentDao;

    @Autowired
    private CustomValidator customValidator;


    @Transactional
    public void addOrUpdateDepartment(Department department) throws NotValidValueException {
        customValidator.validate(department);
        departmentDao.addOrUpdateDepartment(department);
    }

    @Transactional
    public void deleteDepartment(Department department){
        departmentDao.deleteDepartment(department);
    }

    @Transactional(readOnly = true)
    public List<Department> getAllDepartments()  {
        return departmentDao.getAllDepartments();
    }

    @Transactional(readOnly = true)
    public Department getDepartmentById(Integer departmentId) {
        return departmentDao.getDepartmentById(departmentId);
    }

    @Transactional(readOnly = true)
    public Department getDepartmentByName(String name) {
        return departmentDao.getDepartmentByName(name);
    }
}
