function DepartmentService() {

    DepartmentService.prototype.save = function (departmentObj) {
        return $.ajax({
            type: "post",
            contentType: "application/json",
            url: "/saveDepartment",
            data: JSON.stringify(departmentObj)
        });
    };

    DepartmentService.prototype.isExist = function (depID) {
        return $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "/addEditDepartment",
            data: {departmentId: depID},
            dataType: 'json'
        });
    };

    DepartmentService.prototype.delete = function (depID) {
        return $.ajax({
            type: "POST",
            url: "/delDepartment",
            data: {departmentId: depID},
            dataType: 'json'
        });
    };
}

DepartmentService.prototype.getAll = function () {
    return $.ajax({
        type: "get",
        contentType: "application/json",
        url: "/myDepartment",
        dataType: 'json'
    });
};



