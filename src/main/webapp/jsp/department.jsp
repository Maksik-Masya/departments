<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
    <link type="text/css" rel="stylesheet" href="/css/myStyle.css"/>

    <title>Department</title>
</head>
<body>


<form class="form-container" method="POST" action='saveDepartment'>

    <input type="hidden" name="departmentId"
           value="<c:out value="${department.departmentid}" />"/> <br/>


    <div class="tittle-field">Department Name :</div>

    <div class="form-field">
        <input class="input-field" type="text" name="name"
               value="<c:out value="${param['name'] eq null ? department.name : param['name']}"/>"/>
        <H1 class="error-field"><c:out value="${errors.name}"/></H1>
    </div>


    <div class="submit-container">
        <input class="submit-button" type="submit" value="Submit"/>
    </div>


</form>
</body>
</html>