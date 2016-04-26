<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
    <link type="text/css" rel="stylesheet" href="/css/myStyle.css"/>
    <title>All Employees</title>
</head>
<body>
<div class="employee-table-form">
    <H1 id="department-tittle">Department: <c:out value="${department.name}"/></H1>
    <table border=1 class="employee-table-container">
        <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>DOB</th>
            <th>Salary</th>
            <th>Email</th>
            <th colspan=2>Action</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach items="${employees}" var="employee">
            <tr>
                <td><c:out value="${employee.firstName}"/></td>
                <td><c:out value="${employee.lastName}"/></td>
                <td><fmt:formatDate pattern="dd-MMM-yyyy" value="${employee.dob}"/></td>
                <td><c:out value="${employee.salary}"/></td>
                <td><c:out value="${employee.email}"/></td>
                <td align="center">
                    <form action="addEditEmployee" method="GET">
                        <input type="hidden" name="id" value="${employee.id}">
                        <input type="hidden" name="id_department" value="${department.departmentid}">
                        <input type="submit" value="Update">
                    </form>
                </td>
                <td align="center">
                    <form action="delEmployee" method="POST">
                        <input type="hidden" name="id" value="${employee.id}">
                        <input type="hidden" name="id_department" value="${department.departmentid}">
                        <input type="submit" value="Delete">
                    </form>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>

    <a class="my-link" href="/addEditEmployee?id_department=<c:out value="${department.departmentid}"/>">Add Employee</a>
    <a class="my-link" href="/">All Departments</a>

</div>
</body>
</html>