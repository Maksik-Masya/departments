<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
    <link type="text/css" rel="stylesheet" href="/css/myStyle.css"/>
    <title>All Departments</title>
</head>
<body>
<div class="department-table-form">
    <table border=1 class="department-table-container">
        <thead>
        <tr>
            <th>Department Name</th>
            <th colspan=2>Action</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach items="${departments}" var="department">
            <tr>
                <td><a href="listEmployee?departmentId=<c:out value="${department.departmentid}"/>"><c:out value="${department.name}"/></a></td>
                <td align="center">
                    <form action="delDepartment" method="POST">
                        <input type="hidden" name="departmentId" value="${department.departmentid}">
                        <input type="submit" value="Delete">
                    </form>
                </td>
                <td align="center">
                    <form action="addEditDepartment" method="POST">
                        <input type="hidden" name="departmentId" value="${department.departmentid}">
                        <input type="submit" value="Update">
                    </form>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
    <a class="my-link" href="/addEditDepartment">Add Department</a>

</div>
</body>
</html>
