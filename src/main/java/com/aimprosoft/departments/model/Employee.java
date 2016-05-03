package com.aimprosoft.departments.model;

/**
 * Created on 06.04.16.
 */
import net.sf.oval.constraint.*;
import com.aimprosoft.departments.utils.UniqueEmail;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer id;


    @NotNull(message = "Must be not NULL")
    @NotEmpty(message = "Must be not empty")
    @Length(min = 3, max = 20, message = "Invalid length")
    @NotBlank(message = "Must be without spaces")
    @Column(name="first_name")
    private String firstName;


    @NotNull(message = "Must be not NULL")
    @NotEmpty(message = "Must be not empty")
    @Length(min = 3, max = 20, message = "Invalid length")
    @NotBlank(message = "Must be without spaces")
    @Column(name="last_name")
    private String lastName;


    @NotNull(message = "Enter the date using template")
    @NotEmpty(message = "Enter the date using template")
    @Column(name="dob")
    private Date dob;


    @NotNull(message = "Must be numerical value")
    @NotEmpty(message = "Must be not empty")
    @NotBlank(message = "Must be without spaces")
    @Column(name="salary")
    private Integer salary;


    @Length(max = 64, message = "Invalid length")
    @Email(message = "Invalid email address")
    @CheckWith(value = UniqueEmail.class, message = "Email address is used")
    @Column(name="email")
    private String email;


    @ManyToOne
    @JoinColumn(name="id_department")
    private Department department;

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getDob() {
        return dob;
    }

    public void setDob(Date dob) {
        this.dob = dob;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }
}
