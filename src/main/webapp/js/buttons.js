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
        var idDep = this.idDep;
        return $('<input/>', {
            type: 'button',
            value: 'Edit',
            on: {
                click: function () {

                    var service = new DepartmentService();
                    service.isExist(idDep).then(function (data) {

                        var departmentDialog = new DepartmentDialog(data);
                        departmentDialog.render();

                    }, function () {
                        var departmentDialog = new DepartmentDialog('');
                        departmentDialog.render();
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

var ButtonSaveDepartment = ButtonType.extend({
    init: function () {
        //this.idDep = id;
    },
    createElement: function (context) {
        // var idDep = this.idDep;
        return $('<input/>', {
            class: "submit-button",
            type: 'button',
            value: 'Save',
            on: {
                click: function () {

                    var data = context.getData();
                    var departmentObj = {"departmentid": context.config.departmentID, "name": data.departmentName};

                    var departmentService = new DepartmentService();

                    departmentService.save(departmentObj).then(function (resp) {
                        if (resp.status == "SUCCESS") {

                            departmentService.getAll().then(function (data) {
                                var dep = new DepartmentTable(data);
                                dep.render();
                                var ff = (new ButtonType("Create New")).createElement();
                                $('#content').append(ff);
                            });

                            console.log("save success")
                        }
                        else {
                            console.log("save fail");
                            //  spanName.text(resp.result.name);
                        }
                    });
                }
            }
        });
    }
});

var ButtonCancelDepartment = ButtonType.extend({
    init: function () {
        //this.idDep = id;
    },
    createElement: function (context) {
        // var idDep = this.idDep;
        return $('<input/>', {
            class: "cancel-button",
            type: 'button',
            value: 'Cancel',
            on: {
                click: function () {

                    var departmentService = new DepartmentService();
                    departmentService.getAll().then(function (data) {
                        var dep = new DepartmentTable(data);
                        dep.render();
                        var ff = (new ButtonType("Create New")).createElement();
                        $('#content').append(ff);
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