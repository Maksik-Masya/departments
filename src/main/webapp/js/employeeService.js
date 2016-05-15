var EmployeeService = Class.extend({
    init: function () {
    },

    getAll: function (depID) {
        $.ajax({
            url: "/listEmployee",
            type: 'GET',
            contentType: "application/json",
            dataType: 'json',
            data: {departmentId: depID},
            success: function (data) {
                (new TableDraw()).drawEmployeeTable(data, depID)
            },
            error: function () {
                new ErrorPage();
            }
        });
    },

    deleteEmployee: function (employeeID) {
        var thisObj = this;
        $.ajax({
            url: "/delEmployee",
            type: 'POST',
            dataType: 'json',
            data: {id: employeeID},
            success: function (data) {
                thisObj.getAll(data.department.departmentid);
            },
            error: function () {
                new ErrorPage();
            }
        });
    },

    saveEmployee: function () {
        var thisObj = this;
        var data = {};
        $("#employeeFormForValid").find('input').each(function (i, obj) {
            data[obj.name] = $(obj).val();
        });

        var dob = data.dob;
        dob = dob.replace(/\//g, "-");
        dob = dob.replace(/\./g, "-");

        var employeeObj = {
            "id": (data.id != '' ? data.id : undefined),
            "firstName": data.firstName,
            "lastName": data.lastName,
            "dob": dob,
            "salary": data.salary,
            "email": data.email,
            "department": {
                "departmentid": data.departmentid
            }
        };
        $.ajax({
            url: "/saveEmployee",
            type: 'POST',
            data: JSON.stringify(employeeObj),
            contentType: "application/json",
            success: function () {
                thisObj.getAll(data.departmentid);
            },
            error: function () {
                new ErrorPage();
            }
        });
    },

    setValidator: function () {
        var thisObj = this;
        $('#employeeFormForValid').validate({
            rules: {
                firstName: {
                    required: true,
                    minlength: 3,
                    maxlength: 20
                },
                lastName: {
                    required: true,
                    minlength: 3,
                    maxlength: 20
                },
                dob: {
                    required: true,
                    date: true
                },
                salary: {
                    required: true,
                    number: true
                },
                email: {
                    required: true,
                    email: true,
                    remote: {
                        url: "/uniqEmployeeName",
                        type: "get",
                        contentType: "application/json",
                        data: {
                            id: function () {
                                return $("#id").val();
                            }
                        }
                    }
                }
            }, messages: {
                firstName: {
                    minlength: "Min length is 3",
                    maxlength: "Min length is 20",
                    required: "This is required field"
                },
                lastName: {
                    minlength: "Min length is 3",
                    maxlength: "Min length is 20",
                    required: "This is required field"
                },
                salary: {
                    required: "This is required field",
                    number: "Must be numerical"
                },
                email: {
                    required: "This is required field",
                    email: "Not valid email",
                    remote: "Email already in use"
                },
                dob: {
                    required: "This is required field"
                }
            },
            submitHandler: function () {
                thisObj.saveEmployee()
            }
        });
    }
});