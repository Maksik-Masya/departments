var Table = Class.extend({
    init: function (config) {
        this.config = config;
    },

    render: function () {
        var div = this.div = $('<table id="table" border="1"/>');
        $('#content').html(div);
        div.addClass(this.config.tableClass);

        //create columns name
        var trNameColumn = $('<tr/>').appendTo(div);
        this.config.columnsName.forEach($.proxy(function (i) {
            trNameColumn.append("<th>" + i.name + "</th>");
        }, this));
        trNameColumn.append("<th colspan='" + this.config.amountControlButtons + "'>Actions</th>");

        //create rows
        var rows = this.config.rows;
        for (var data in rows) {
            var tr = $('<tr/>').appendTo(div);
            var objects = rows[data];
            for (var field in objects) {
                if (field != 'id') {
                    var object = objects[field];
                    if (object instanceof ButtonType) {
                        var btn = object.createElement(this);
                        var td = $('<td align="center"/>');
                        td.append(btn);
                        tr.append(td);
                    } else {
                        tr.append("<td>" + objects[field] + "</td>");
                    }
                }
            }
        }
    },

    removeRow: function (item) {
        var arr = this.config.rows;
        for (var i = arr.length; i--;) {
            if (arr[i].id === item) {
                arr.splice(i, 1);
            }
        }
    }
});

var DepartmentTable = Table.extend({
    init: function (data) {
        var content = $('#content');
        content.removeClass("employee-table-form");
        content.addClass("department-table-form");

        var dep = [];
        data.forEach(function(elm) {
            dep.push({
                id: elm.departmentid,
                name: elm.name,
                button1: new ButtonDeleteDepartment(elm.departmentid),
                button2: new ButtonEditDepartment(elm.departmentid),
                button3: new ButtonListEmployee(elm.departmentid)
            });
        });
        this._super({
            tableClass: "department-table-container",
            amountControlButtons: 3,
            hiddenColumn: 'id',
            columnsName: [
                {name: 'Name'}
            ],
            rows: dep
        });
    }
});

var EmployeeTable = Table.extend({
    init: function (data) {
        var content = $('#content');
        content.removeClass("department-table-form");
        content.addClass("employee-table-form");

        var empl = [];
        data.forEach(function(elm) {
            var birthdayVar = new Date(elm.dob);
            empl.push({
                id: elm.id,
                firstName: elm.firstName,
                lastName: elm.lastName,
                dob: birthdayVar.getFullYear() + "-" + (birthdayVar.getMonth() + 1) + "-" + birthdayVar.getDate(),
                salary: elm.salary,
                email: elm.email,
                button1: new ButtonDeleteEmployee(elm.id),
                button2: new ButtonEditDepartment(elm.id)
            });
        });
        this._super({
            tableClass: "employee-table-container",
            amountControlButtons: 2,
            hiddenColumn: 'id',
            columnsName: [
                {name: 'First name'},
                {name: 'Last name'},
                {name: 'Birthday'},
                {name: 'Salary'},
                {name: 'Email'}
            ],
            rows: empl
        });
    }
});
