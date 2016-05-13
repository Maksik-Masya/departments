var FormDraw = Class.extend({
    init: function () {
    },

    drawDepartmentForm: function (dep) {
        var content = $('#content');
        content.children().detach();
        var div = $('<div/>').appendTo(content)
            .append($("<form enctype='multipart/form-data' id='departmentFormForValid' class='department-form'/>")
                .append($('<input type="hidden" name="departmentid"/>')
                    .val(dep != null ? dep.departmentid : ""))
                .append($("<label for='name' class='tittle-field'>Department Name</label>"))
                .append($("<div class='form-field'/>")
                    .append($("<input name='name' type='text'/>")
                        .addClass("input-field")
                        .val(dep != null ? dep.name : "")))
                .append($('<input class="submit-button" type="submit" value="Save"/>')));

        (new DepartmentService()).validator();
    },

    drawEmployeeForm: function (emp, depID) {
        var emplDOB = '';
        if (emp != null) {
            var birthdayVar = new Date(emp.dob);
            emplDOB = birthdayVar.getFullYear() + "-" + (birthdayVar.getMonth() + 1) + "-" + birthdayVar.getDate();
        }

        var content = $('#content')
            .addClass("department-table-form")
            .removeClass("employee-table-form");
        content.children().detach();
        var div = $('<div/>').appendTo(content)

            .append($("<form enctype='multipart/form-data' id='employeeFormForValid' class='department-form'/>")
                .append($('<input type="hidden" name="id"/>')
                    .val(emp != null ? emp.id : ""))
                .append($('<input type="hidden" name="departmentid" value="' + depID + '"/>'))
                .append($("<label for='firstName' class='tittle-field'>First Name</label>"))
                .append($("<div class='form-field'/>")
                    .append($("<input name='firstName' type='text'/>")
                        .addClass("input-field")
                        .val(emp != null ? emp.firstName : "")))
                .append($("<label for='lastName' class='tittle-field'>Last Name</label>"))
                .append($("<div class='form-field'/>")
                    .append($("<input name='lastName' type='text'/>")
                        .addClass("input-field")
                        .val(emp != null ? emp.lastName : "")))
                .append($("<label for='dob' class='tittle-field'>Birthday</label>"))
                .append($("<div class='form-field'/>")
                    .append($("<input name='dob' type='text'/>")
                        .addClass("input-field")
                        .val(emplDOB)
                        .attr('placeholder', 'dd-MM-yyyy')))
                .append($("<label for='salary' class='tittle-field'>Salary</label>"))
                .append($("<div class='form-field'/>")
                    .append($("<input name='salary' type='text'/>")
                        .addClass("input-field")
                        .val(emp != null ? emp.salary : "")))
                .append($("<label for='email' class='tittle-field'>Email</label>"))
                .append($("<div class='form-field'/>")
                    .append($("<input name='email' type='text'/>")
                        .addClass("input-field")
                        .val(emp != null ? emp.email : "")))
                .append($('<input class="submit-button" type="submit" value="Save"/>')));

        (new EmployeeService()).validator();
    }
});