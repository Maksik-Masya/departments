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
                        var btn_new = (new ButtonAddEmployee()).createElement();
                        $('#content').append(btn_new);
                        var btn_list = (new ButtonListDepartments()).createElement();
                        $('#content').append(btn_list);
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

var ButtonAddDepartment = ButtonType.extend({
    init: function () {
    },
    createElement: function () {
        return $('<input/>', {
            type: 'button',
            value: 'Add new',
            on: {
                click: function () {
                    var departmentDialog = new DepartmentDialog('');
                    departmentDialog.render();
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
                        var btn = (new ButtonAddDepartment()).createElement();
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
    },
    createElement: function (context) {
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
                        var ff = (new ButtonAddDepartment()).createElement();
                        $('#content').append(ff);
                    });

                }
            }
        });
    }
});

var ButtonListDepartments = ButtonType.extend({
    init: function () {
    },
    createElement: function () {
        return $('<input/>', {
            class: 'listDepButtonCSS',
            type: 'button',
            value: 'Departments',
            on: {
                click: function () {
                    var departmentService = new DepartmentService();
                    departmentService.getAll().then(function (data) {
                        var dep = new DepartmentTable(data);
                        dep.render();
                        var btn = (new ButtonAddDepartment()).createElement();
                        $('#content').append(btn);
                    });

                }
            }
        });
    }
});

var ButtonSaveEmployee = ButtonType.extend({
    init: function () {
    },
    createElement: function (context) {
        return $('<input/>', {
            class: "submit-button",
            type: 'button',
            value: 'Save',
            on: {
                click: function () {
                    var data = context.getData();
                    var departmentService = new DepartmentService();
                    departmentService.isExist(data.departmentid).then(function (department) {
                        var dob = data.dob;
                        dob = dob.replace(/\//g, "-");
                        dob = dob.replace(/\./g, "-");

                        var employeeObj = {
                            "id": context.config.employeeID,
                            "firstName": data.firstName,
                            "lastName": data.lastName,
                            "dob": dob,
                            "salary": data.salary,
                            "email": data.email,
                            "department": department
                        };
                        var employeeService = new EmployeeService();
                        employeeService.save(employeeObj).then(function (resp) {
                            if (resp.status == "SUCCESS") {
                                employeeService.getAll(data.departmentid).then(function (data) {
                                    var dep = new EmployeeTable(data);
                                    dep.render();
                                    var ff = (new ButtonType("Create New")).createElement();
                                    var btn_new = (new ButtonAddEmployee()).createElement();
                                    $('#content').append(btn_new);
                                    var btn_list = (new ButtonListDepartments()).createElement();
                                    $('#content').append(btn_list);
                                });
                                console.log("save success")
                            }
                            else {
                                console.log("save fail");
                                //  spanName.text(resp.result.name);
                            }
                        });
                    });
                }
            }
        });
    }
});

var ButtonCancelEmployee = ButtonType.extend({
    init: function (id) {
        this.idDep = id;
    },
    createElement: function (context) {
        var idDep = this.idDep;
        return $('<input/>', {
            class: "cancel-button",
            type: 'button',
            value: 'Cancel',
            on: {
                click: function () {

                    var employeeService = new EmployeeService();
                    employeeService.getAll(idDep).then(function (data) {
                        var empl = new EmployeeTable(data);
                        empl.render();
                        var btn_new = (new ButtonAddEmployee()).createElement();
                        $('#content').append(btn_new);
                        var btn_list = (new ButtonListDepartments()).createElement();
                        $('#content').append(btn_list);
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

                        var btn_new = (new ButtonAddEmployee()).createElement();
                        $('#content').append(btn_new);
                        var btn_list = (new ButtonListDepartments()).createElement();
                        $('#content').append(btn_list);
                    }, function () {
                        console.log("department is not exist");
                    });
                }
            }
        });
    }
});

var ButtonEditEmployee = ButtonType.extend({
    init: function (id) {
        this.idEmpl = id;
    },
    createElement: function () {
        var idEmpl = this.idEmpl;
        return $('<input/>', {
            type: 'button',
            value: 'Edit',
            on: {
                click: function () {

                    var service = new EmployeeService();
                    service.isExist(idEmpl).then(function (data) {

                        var employeeDialog = new EmployeeDialog(data);
                        employeeDialog.render();

                    }, function () {
                        var employeeDialog = new EmployeeDialog('');
                        employeeDialog.render();
                    });
                }
            }
        });
    }
});

var ButtonAddEmployee = ButtonType.extend({
    init: function () {
    },
    createElement: function () {
        return $('<input/>', {
            class: 'listDepButtonCSS',
            type: 'button',
            value: 'Add new',
            on: {
                click: function () {
                    var employeeDialog = new EmployeeDialog('');
                    employeeDialog.render();
                }
            }
        });
    }
});
