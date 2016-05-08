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
        return btn;
    }
});

var ButtonDeleteDepartment = ButtonType.extend({
    init: function (id) {
        this.idDep = id;
    },
    createElement: function (context) {
        var idDep = this.idDep;
        var btn = $('<input/>', {
            type: 'button',
            value: 'Delete',
            name: idDep,
            on: {
                click: function () {
                    document.getElementById('wwww').addEventListener('click', deleteR, false);
                    function deleteR(e) {
                        var departmentService = new DepartmentService();
                        departmentService.delete(idDep).then(function () {
                            if (!e) {
                                e = window.event;
                            }
                            if (e.target.value == "Delete") {
                                var row = e.target.parentNode.parentNode.rowIndex;
                                context.deleteRow(row);
                            }
                            console.log("department is deleted");
                        }, function () {
                            console.log("department is not exist");
                        });
                    }
                }
            }
        });
        return btn;
    }
});