

$( document ).ready(function() {


    //var departmentService = new DepartmentService();
    //departmentService.getAll().then(function (data) {
    //    var dep = new DepartmentTable(data);
    //    dep.render();
    //    var ff = (new ButtonType("Create New")).createElement();
    //    $('#content').append(ff);
    //});


    var validatedRules = {
        rules: {
            departm_name_input: {
                required: true,
                minlength: 3
            }
        }, messages: {
            departm_name_input: {
                minlength: "Min length is 3",
                required: "This is required field"
            }
        }
    };


    var dialog = new DepartmentDialog();
    dialog.render();

  //  $('#departmentFormForValid').validate(validatedRules);


});