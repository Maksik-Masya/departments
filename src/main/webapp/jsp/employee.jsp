<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
    <link type="text/css" rel="stylesheet" href="/css/myStyle.css"/>
    <title>New employee</title>
</head>
<body>

<form:errors path="employee.*"/>

<form method="POST" class="form-container" action='saveEmployee' name="frmAddEmployee">

    <input type="hidden" readonly="readonly" name="id"
    <%--value="<c:out value="${employee.id}" />"/>--%>
           value="<c:out value="${param['id'] eq null ? employee.id : param['id']}"/>"/>

    <br/>

    <div class="tittle-field">First Name :</div>

    <div class="form-field">
        <input class="input-field" type="text" name="firstName"
               value="<c:out value="${param['firstName'] eq null ? employee.firstName : param['firstName']}"/>"/>
        <H1 class="error-field"><c:out value="${errors.firstName}"/></H1>
    </div>

    <div class="tittle-field">Last Name :</div>

    <div class="form-field">
        <input class="input-field" type="text" name="lastName"
               value="<c:out value="${param['lastName'] eq null ? employee.lastName : param['lastName']}"/>"/>
        <H1 class="error-field"><c:out value="${errors.lastName}"/></H1>
    </div>

    <div class="tittle-field">Day Of Birthday :</div>

    <div class="form-field">
        <input class="input-field" type="text" placeholder="yyyy-MM-dd" name="dob"
               value="<c:out value="${param['dob'] eq null ? employee.dob : param['dob']}"/>"/>
        <H1 class="error-field"><c:out value="${errors.dob}"/></H1>
    </div>

    <div class="tittle-field">Salary :</div>

    <div class="form-field">
        <input class="input-field" type="text" name="salary"
               value="<c:out value="${param['salary'] eq null ? employee.salary : param['salary']}"/>"/>
        <H1 class="error-field"><c:out value="${errors.salary}"/></H1>
    </div>

    <div class="tittle-field">Email :</div>

    <div class="form-field">
        <input class="input-field" type="text" name="email"
               value="<c:out value="${param['email'] eq null ? employee.email : param['email']}"/>"/>
        <H1 class="error-field"><c:out value="${errors.email}"/></H1>
    </div>

    <div class="tittle-field">Department ID :</div>

    <div class="form-field">
        <select class="select-field" name="id_department">
            <c:forEach items="${departments}" var="department">
                <option value="${department.departmentid}" ${department.departmentid == id_department ? 'selected' : ''}>${department.name}</option>
            </c:forEach>
        </select>
    </div>

    <div class="submit-container">
        <input class="submit-button" type="submit" value="Submit"/>
    </div>
</form>
</body>
</html>
