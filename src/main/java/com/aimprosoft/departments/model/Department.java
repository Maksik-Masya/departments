package com.aimprosoft.departments.model;

import com.aimprosoft.departments.utils.UniqueDepartment;
import net.sf.oval.constraint.*;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;
import java.util.List;


/**
 * Created on 06.04.16.
 */

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer departmentid;

    @Column(name = "name")
    @NotNull(message = "Must be not NULL")
    @NotEmpty(message = "Must be not empty")
    @Length(min = 3, max = 20, message = "Invalid length")
    @NotBlank(message = "Must be without spaces")
    @CheckWith(value = UniqueDepartment.class, message = "Name is used")
    private String name;

    @OneToMany(targetEntity = Employee.class, mappedBy = "department")
    private List<Employee> employees;

    public List<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(List<Employee> employees) {
        this.employees = employees;
    }

    public Integer getDepartmentid() {
        return departmentid;
    }

    public void setDepartmentid(Integer departmentid) {
        this.departmentid = departmentid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Department [id=" + departmentid + ", name=" + name + "]";
    }
}
