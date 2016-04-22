package com.aimprosoft.departments.utils;

import com.aimprosoft.departments.model.Department;
import net.sf.oval.constraint.CheckWithCheck;
import com.aimprosoft.departments.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Objects;

/**
 * Created on 12.04.16.
 */

@Component
public class UniqueDepartment implements CheckWithCheck.SimpleCheck {

    @Autowired
    private DepartmentService departmentService;

    @Override
    public boolean isSatisfied(Object validatedObject, Object value) {
        if (value == null) return true;

        Integer id = ((Department) validatedObject).getDepartmentid();
        String val = value.toString();
        return checkName(id, val);
    }

    private boolean checkName(Integer id, String val) {
        Department department = null;
        try {
            department = departmentService.getDepartmentByName(val);
        } catch (RuntimeException e) {
            e.printStackTrace();
        }
        return department == null || id != null && Objects.equals(id, department.getDepartmentid());
    }
}


