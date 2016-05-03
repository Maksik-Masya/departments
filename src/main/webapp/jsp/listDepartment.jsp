<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
    <link type="text/css" rel="stylesheet" href="/css/myStyle.css"/>
    <%--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>--%>
    <%--<script src="//ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"></script>--%>
    <%--<script src="//ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"></script>--%>
    <script src="//code.jquery.com/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="/js/jquery.validate.min.js"></script>
    <script type="text/javascript" src="/js/models.js"></script>
    <script type="text/javascript" src="/js/employeeForm.js"></script>
    <script type="text/javascript" src="/js/employeeService.js"></script>
    <script type="text/javascript" src="/js/departmentService.js"></script>
    <script type="text/javascript" src="/js/departmentForm.js"></script>
    <title>All Departments</title>
</head>
<body>
<div class="department-table-form" id="table-content">
    <%--<table border=1 class="department-table-container" id="department-table">--%>
        <%--<thead>--%>
        <%--<tr>--%>
            <%--<th>Department Name</th>--%>
            <%--<th colspan=2>Action</th>--%>
        <%--</tr>--%>
        <%--</thead>--%>
        <%--<tbody>--%>
        <%--<c:forEach items="${departments}" var="department">--%>
            <%--<tr>--%>
                <%--<td><a href="listEmployee?departmentId=<c:out value="${department.departmentid}"/>"><c:out--%>
                        <%--value="${department.name}"/></a></td>--%>
                <%--<td align="center">--%>
                    <%--<form action="delDepartment" method="POST">--%>
                        <%--<input type="hidden" name="departmentId" value="${department.departmentid}">--%>
                        <%--<input type="submit" value="Delete">--%>
                    <%--</form>--%>
                <%--</td>--%>
                <%--<td align="center">--%>
                    <%--<form action="addEditDepartment" method="GET">--%>
                        <%--<input type="hidden" name="departmentId" value="${department.departmentid}">--%>
                        <%--<input type="submit" value="Update">--%>
                    <%--</form>--%>
                <%--</td>--%>
            <%--</tr>--%>
        <%--</c:forEach>--%>
        <%--</tbody>--%>

            <%--<tr>--%>
                <%--<th>Name</th>--%>
                <%--<th>Action</th>--%>
            <%--</tr>--%>

    <%--</table>--%>

    <%--<a class="my-link" href="/addEditDepartment">Add Department</a>--%>

</div>
</body>
</html>