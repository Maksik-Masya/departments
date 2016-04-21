package com.aimprosoft.departments.persistence.hibernate;

import com.aimprosoft.departments.model.Department;
import com.aimprosoft.departments.model.Employee;
import org.hibernate.*;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.aimprosoft.departments.persistence.EmployeeDao;


import java.util.List;

/**
 * Created on 14.04.16.
 */

@Repository
public class EmployeeDaoImpl implements EmployeeDao {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public void addOrUpdateEmployee(Employee employee) {
        sessionFactory.getCurrentSession().saveOrUpdate(employee);
    }

    @Override
    public void deleteEmployee(Employee employee) {
        sessionFactory.getCurrentSession().delete(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return null;
    }

    @Override
    public Employee getEmployeeById(int id) {
        Session session = sessionFactory.getCurrentSession();
        Employee employee = session.get(Employee.class, id);
        return employee;
    }

    @Override
    public Employee getEmployeeByEmail(String email_value) {
        Session session = sessionFactory.openSession();
        Criteria criteria = session.createCriteria(Employee.class);
        Employee employee = (Employee) criteria.add(Restrictions.eq("email", email_value)).uniqueResult();
        session.close();
        return employee;
    }

    @Override
    public List getEmployeeByDepartmentId(Department department) {
        Session session = sessionFactory.openSession();
        Query query = session.createQuery("FROM Employee WHERE department =:dep");
        query.setParameter("dep", department);
        List entityList = query.list();
        session.close();
        return entityList;
    }
}
