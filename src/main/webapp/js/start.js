$(document).ready(function () {


    //var departmentService = new DepartmentService();
    //departmentService.getAll().then(function (data) {
    //    var dep = new DepartmentTable(data);
    //    dep.render();
    //    var ff = (new ButtonType("Create New")).createElement();
    //    $('#content').append(ff);
    //});


    var dialog = new EmployeeDialog('');
    dialog.render();
    //dialog.getData();
});