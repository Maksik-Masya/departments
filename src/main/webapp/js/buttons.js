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
        var btn = $('<input/>', {
            type: 'button',
            value: 'Employees',
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
        return btn;
    }
});

var ButtonEditDepartment = ButtonType.extend({
    init: function (id) {
        this.idDep = id;
    },
    createElement: function () {
        var btn = $('<input/>', {
            type: 'button',
            value: 'Employees',
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
        return btn;
    }
});

var ButtonDeleteDepartment = ButtonType.extend({
    init: function (id) {
        this.idDep = id;
    },
    createElement: function () {
        var btn = $('<input/>', {
            type: 'button',
            value: 'Delete',
            name: this.idDep,
            on: {
                click: function () {
                    var departmentService = new DepartmentService();
                    departmentService.delete(this.name).then(function (data) {
                        $('#wwww').remove();
                        console.log("department is deleted");
                        departmentService.getAll().then(function (data) {
                            var dep = new DepartmentTable(data);
                            dep.render();
                        });

                        
                    }, function () {
                        console.log("department is not exist");
                    });
                }
            }
        });
        return btn;
    }
});