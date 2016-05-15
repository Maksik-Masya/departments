var TableDraw = Class.extend({

    init: function () {
    },

    drawDepartmentTable: function (data) {
        var content = $('#content')
            .addClass("department-table-form")
            .removeClass("employee-table-form");
        content.children().detach();

        var div = $('<div/>').on('click', (new ButtonHandler()).depAddBtn).appendTo(content);

        var tr = $("<tr/>")
            .append("<th>Name</th>")
            .append("<th colspan='3'>Action</th>");

        var table = $('<table border="1"/>')
            .addClass("department-table-container")
            .appendTo(div).html(tr);

        for (var i = 0; i < data.length; i++) {
            var department = data[i];
            $('<tr/>').on('click', {dep: department}, (new ButtonHandler()).depTable)
                .append($('<td>').text(department.name))
                .append($('<td align="center">')
                    .append($('<button id="btn_del"/>').text("Delete")))
                .append($('<td align="center">')
                    .append($('<button id="btn_upd"/>').text("Update")))
                .append($('<td align="center">')
                    .append($('<button id="bnt_list_empl"/>').text("List Employee")))
                .appendTo(table);
        }

        $('<button id="btn_add_dep"/>').text("New department").appendTo(div);


    },


    drawEmployeeTable: function (data, depID) {
        var content = $('#content')
            .removeClass("department-table-form")
            .addClass("employee-table-form");
        content.children().detach();

        var div = $('<div data-id=' + depID + '/>').on('click', {depID : depID},
            (new ButtonHandler()).emplAddBtn).appendTo(content);

        var tr = $("<tr/>")
            .append("<th>First Name</th>")
            .append("<th>Last Name</th>")
            .append("<th>DOB</th>")
            .append("<th>Salary</th>")
            .append("<th>Email</th>")
            .append("<th colspan='2'>Action</th>");

        var table = $('<table border="1"/>')
            .addClass("employee-table-container")
            .appendTo(div).html(tr);

        for (var i = 0; i < data.length; i++) {
            var emp = data[i];
            var birthdayVar = new Date(emp.dob);
            var formatedDate = birthdayVar.getFullYear() + "-" + (birthdayVar.getMonth() + 1) + "-" + birthdayVar.getDate();
            $('<tr/>').on('click', {empl: emp, depID: depID}, (new ButtonHandler()).employeeTable)
                .append($('<td/>').text(emp.firstName))
                .append($('<td/>').text(emp.lastName))
                .append($('<td/>').text(formatedDate))
                .append($('<td/>').text(emp.salary))
                .append($('<td/>').text(emp.email))
                .append($('<td align="center">')
                    .append($('<button class="button primary" id="btn_del"/>').text("Delete")))
                .append($('<td align="center">')
                    .append($('<button class="button primary" id="btn_upd"/>').text("Update")))
                .appendTo(table);
        }
        $('<button class="listDepButtonCSS" id = "addNewEmployee"/>').text("New employee").appendTo(div);
        $('<button class="listDepButtonCSS" id = "backToDep"/>').text("Departments").appendTo(div);
    }


});