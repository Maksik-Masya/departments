function EmployeeService() {

    EmployeeService.prototype.getAll = function (depID) {
        return $.ajax({
            type: "get",
            contentType: "application/json",
            url: "/listEmployee",
            data: {departmentId: depID},
            dataType: 'json'
        });
    };

    EmployeeService.prototype.delete = function (employeeID) {
        return $.ajax({
            type: "POST",
            url: "/delEmployee",
            data: {id: employeeID},
            dataType: 'json'
        });
    };

    EmployeeService.prototype.isExist = function (employeeID) {
        return $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/addEditEmployee",
            data: {id: employeeID},
            dataType: 'json'
        });
    };
    
}