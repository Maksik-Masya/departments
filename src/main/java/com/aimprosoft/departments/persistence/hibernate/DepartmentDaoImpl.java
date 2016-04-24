package com.aimprosoft.departments.persistence.hibernate;

import org.hibernate.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.aimprosoft.departments.persistence.DepartmentDao;
import com.aimprosoft.departments.model.Department;
import org.hibernate.criterion.Restrictions;

import java.util.List;

/**
 * Created on 14.04.16.
 */

@Repository
public class DepartmentDaoImpl implements DepartmentDao {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public void addOrUpdateDepartment(Department department) {
        sessionFactory.getCurrentSession().saveOrUpdate(department);
    }

    @Override
    public void deleteDepartment(Department department) {
        sessionFactory.getCurrentSession().delete(department);
    }

    @Override
    public List<Department> getAllDepartments() {
//        if(true) {
//            throw new HibernateException("");
//        }
        Session session = sessionFactory.getCurrentSession();
        List<Department> departments = session.createQuery("from Department").list();
        return departments;
    }

    @Override
    public Department getDepartmentByName(String name_value) {
        Session session = sessionFactory.openSession();
        Criteria criteria = session.createCriteria(Department.class);
        Department department = (Department) criteria.add(Restrictions.eq("name", name_value)).uniqueResult();
        session.close();
        return department;
    }

    @Override
    public Department getDepartmentById(Integer departmentId) {
        Session session = sessionFactory.getCurrentSession();
        Department department = session.get(Department.class, departmentId);
        return department;
    }
}
