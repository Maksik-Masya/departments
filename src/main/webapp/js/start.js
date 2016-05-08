

$( document ).ready(function() {


    var departmentService = new DepartmentService();
    departmentService.getAll().then(function (data) {
        var dep = new DepartmentTable(data);
        dep.render();
    });
    
    //var contrBtn = new ButtonType("Create New");
    
    var depDiv = $('<div id="departmentDiv"/>');
    var ff = (new ButtonType("Create New")).createElement();
    
    $('#table-content').append(depDiv);
    $('#table-content').append(ff);



    // var dep = new DepartmentDialog();
    // dep.render();

});