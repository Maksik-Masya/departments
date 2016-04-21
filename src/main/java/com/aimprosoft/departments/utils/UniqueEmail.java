package com.aimprosoft.departments.utils;

import com.aimprosoft.departments.model.Employee;
import net.sf.oval.constraint.CheckWithCheck;
import com.aimprosoft.departments.service.EmployeeService;
import java.util.Objects;

/**
 * Created on 12.04.16.
 */

public class UniqueEmail implements CheckWithCheck.SimpleCheck {
    private EmployeeService employeeService = ApplicationContextSetter.getBean(EmployeeService.class);

    @Override
    public boolean isSatisfied(Object validatedObject, Object value) {
        if (value == null) return true;

        Integer id = ((Employee) validatedObject).getId();
        String val = value.toString();
        return checkEmail(id, val);
    }

    private boolean checkEmail(Integer id, String val) {
        Employee employee = null;
        try {
            employee = employeeService.getEmployeeByEmail(val);
        } catch (RuntimeException e) {
            e.printStackTrace();
        }
        return employee == null || id != null && Objects.equals(id, employee.getId());
    }
}
