var ButtonType = Class.extend({
    init: function (text) {
        this.text = text;
    },
    createElement: function () {
        var btn = $('<input/>', {
            type: 'button'
        });
        if (this.text) {
            btn.val(this.text);
        }
        return btn;
    }
});

var ButtonListEmployee = ButtonType.extend({
    init: function (id) {
        this.idDep = id;
    },
    createElement: function () {
        var idDep = this.idDep;
        return $('<input/>', {
            type: 'button',
            value: 'Employees',
            on: {
                click: function () {
                    var employeeService = new EmployeeService();
                    employeeService.getAll(idDep).then(function (data) {
                        var dep = new EmployeeTable(data);
                        dep.render();
                        var btn = (new ButtonType("Create New")).createElement();
                        $('#content').append(btn);
                    });
                }
            }
        });
    }
});

var ButtonEditDepartment = ButtonType.extend({
    init: function (id) {
        this.idDep = id;
    },
    createElement: function () {
        return $('<input/>', {
            type: 'button',
            value: 'Edit',
            name: this.idDep,
            on: {
                click: function () {

                    var idDep = this.name;

                    (new EmployeeService()).getAll(idDep).then(function (data) {


                    }, function () {
                        console.log("employees isn't exist");
                    });
                }
            }
        });
    }
});

var ButtonDeleteDepartment = ButtonType.extend({
    init: function (id) {
        this.idDep = id;
    },
    createElement: function (context) {
        var idDep = this.idDep;
        return $('<input/>', {
            type: 'button',
            value: 'Delete',
            on: {
                click: function () {
                    var departmentService = new DepartmentService();
                    departmentService.delete(idDep).then(function () {
                        context.removeRow(idDep);
                        context.render();
                        var btn = (new ButtonType("Create New")).createElement();
                        $('#content').append(btn);
                    }, function () {
                        console.log("department is not exist");
                    });
                }
            }
        });
    }
});

var ButtonDeleteEmployee = ButtonType.extend({
    init: function (id) {
        this.id = id;
    },
    createElement: function (context) {
        var id = this.id;
        return $('<input/>', {
            type: 'button',
            value: 'Delete',
            on: {
                click: function () {
                    var employeeService = new EmployeeService();
                    employeeService.delete(id).then(function () {
                        context.removeRow(id);
                        context.render();
                        var btn = (new ButtonType("Create New")).createElement();
                        $('#content').append(btn);
                    }, function () {
                        console.log("department is not exist");
                    });
                }
            }
        });
    }
});