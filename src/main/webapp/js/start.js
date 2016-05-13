$(document).ready(function () {


    //var departmentService = new DepartmentService();
    //departmentService.getAll().then(function (data) {
    //    var dep = new DepartmentTable(data);
    //    dep.render();
    //    var ff = (new ButtonAddDepartment()).createElement();
    //    $('#content').append(ff);
    //});

    var service = new DepartmentService();
    service.getAll();

    //var dialog = new EmployeeDialog('');
    //dialog.render();
    //dialog.getData();
});