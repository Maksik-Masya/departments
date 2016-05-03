function EmployeeForm() {

    var validatedRules = {
        rules: {
            FirstNameInput: {
                required: true,
                minlength: 3,
                maxlength: 20
            },
            LastNameInput: {
                required: true,
                minlength: 3,
                maxlength: 20
            },
            DOBInput: {
                required: true
            },
            SalaryInput: {
                required: true
            },
            EmailInput: {
                required: true,
                email: true
            }
        }, messages: {
            FirstNameInput: {
                minlength: "Min length is 3",
                maxlength: "Min length is 20",
                required: "This is required field"
            },
            LastNameInput: {
                minlength: "Min length is 3",
                maxlength: "Min length is 20",
                required: "This is required field"
            },
            SalaryInput: {
                required: "This is required field"
            },
            EmailInput: {
                required: "This is required field",
                email: "Not valid email"
            },
            DOBInput: {
                required: "This is required field"
            }
        }
    };

    EmployeeForm.prototype.drowList = function (respons) {

        var content = $("#table-content");
        content.removeClass("department-table-form");
        content.addClass("employee-table-form");
        var divTable = $("<div/>");
        var table = $('<table id="myTable" border="1"/>');
        table.addClass("employee-table-container");
        content.html(divTable);

        var tr = $("<tr/>");
        tr.append("<th>First Name</th>");
        tr.append("<th>Last Name</th>");
        tr.append("<th>DOB</th>");
        tr.append("<th>Salary</th>");
        tr.append("<th>Email</th>");
        tr.append("<th colspan='2'>Action</th>");
        table.append(tr);


        for (var i in respons) {
            var deleteButton = $('<input />', {
                type: 'button',
                value: 'Delete',
                id: 'btn_delete',
                name: respons[i].id,
                on: {
                    click: function () {
                        employeeService.delete(this.name).then(function (data) {
                            var depID = respons[i].department.departmentid;
                            employeeService.getAll(depID).then(function (data) {
                                employeeForm.drowList(data);
                            }, function () {
                                employeeForm.drowList('');
                            });
                        });
                    }
                }
            });

            var editButton = $('<input />', {
                type: 'button',
                value: 'Edit',
                id: 'btn_edit',
                name: respons[i].id,
                on: {
                    click: function () {
                        employeeService.isExist(this.name).then(function (data) {
                            employeeForm.drowEmployeeForm(data);
                            $('#myform').validate(validatedRules);
                        }, function () {
                            console.log("employee is not exist");
                            employeeForm.drowEmployeeForm('');
                        });
                    }
                }
            });

            var row = $("<tr/>");
            row.append("<td>" + respons[i].firstName + "</td>");
            row.append("<td>" + respons[i].lastName + "</td>");
            row.append("<td>" + respons[i].dob + "</td>");
            row.append("<td>" + respons[i].salary + "</td>");
            row.append("<td>" + respons[i].email + "</td>");
            var td1 = $("<td align='center'/>");
            td1.append(deleteButton);
            row.append(td1);
            var td2 = $("<td align='center'/>");
            td2.append(editButton);
            row.append(td2);
            row.appendTo(table);
        }

        var newButton = $('<input />', {
            type: 'button',
            value: 'Departments',
            id: 'btn_new',
            on: {
                click: function () {
                    service.getAll().then(function (data) {
                        form.drowListDepartments(data);
                    }, function () {
                        form.drowListDepartments('');
                    });
                }
            }
        });
        divTable.append(table);
        divTable.append(newButton);
    };

    EmployeeForm.prototype.drowEmployeeForm = function (employee) {
        var content = $("#table-content");
        content.addClass("department-table-form");
        content.removeClass("employee-table-form");
        var divForm = $("<form id='myform' class='department-form'/>");

        //firstName---------------------------------------------------------
        var divFirstName = $("<div class='form-field'/>");
        var labelFirstName = $("<label for='name' class='tittle-field'>First Name</label>");
        var spanFirstName = $("<span class='error'/>");
        var inputFirstName = $("<input/>",
            {
                class: "input-field",
                id: "FirstNameInput",
                name: "FirstNameInput",
                type: 'text',
                value: employee.firstName,
                on: {
                    input: function () {
                        $('#FirstNameInput').valid();
                        spanFirstName.text('');
                    }
                }
            });
        //lastName----------------------------------------------------------
        var divLastName = $("<div class='form-field'/>");
        var labelLastName = $("<label for='name' class='tittle-field'>Last Name</label>");
        var spanLastName = $("<span class='error'/>");
        var inputLastName = $("<input/>",
            {
                class: "input-field",
                id: "LastNameInput",
                name: "LastNameInput",
                type: 'text',
                value: employee.lastName,
                on: {
                    input: function () {
                        $('#LastNameInput').valid();
                        spanLastName.text('');
                    }
                }
            });
        //birthday---------------------------------------------------------
        var divDOB = $("<div class='form-field'/>");
        var labelDOB = $("<label for='name' class='tittle-field'>Birthday</label>");
        var spanDOB = $("<span class='error'/>");
        var inputDOB = $("<input/>",
            {
                class: "input-field",
                id: "DOBInput",
                name: "DOBInput",
                type: 'text',
                value: employee.dob,
                on: {
                    input: function () {
                        $('#DOBInput').valid();
                        spanDOB.text('');
                    }
                }
            });
        //Salary---------------------------------------------------------
        var divSalary = $("<div class='form-field'/>");
        var labelSalary = $("<label for='name' class='tittle-field'>Salary</label>");
        var spanSalary = $("<span class='error'/>");
        var inputSalary = $("<input/>",
            {
                class: "input-field",
                id: "SalaryInput",
                name: "SalaryInput",
                type: 'text',
                value: employee.salary,
                on: {
                    input: function () {
                        $('#SalaryInput').valid();
                        spanSalary.text('');
                    }
                }
            });
        //Email---------------------------------------------------------
        var divEmail = $("<div class='form-field'/>");
        var labelEmail = $("<label for='name' class='tittle-field'>Email</label>");
        var spanEmail = $("<span class='error'/>");
        var inputEmail = $("<input/>",
            {
                class: "input-field",
                id: "EmailInput",
                name: "EmailInput",
                type: 'text',
                value: employee.email,
                on: {
                    input: function () {
                        $('#EmailInput').valid();
                        spanEmail.text('');
                    }
                }
            });
        //Department---------------------------------------------------------
        var divDepartment = $("<div class='form-field'/>");
        var labelDepartment = $("<label for='name' class='tittle-field'>Department</label>");
        var spanDepartment = $("<span class='error'/>");
        var selectDepartment = $("<select class='select-field'/>",
            {
                class: "input-field",
                id: "DepartmentInput",
                name: "DepartmentInput"
            });

        for (var i in globalListDep) {
            var option;
            if (globalListDep[i].name == employee.department.name) {
                option = $("<option value='" + globalListDep[i].departmentid + "' selected>" +
                    globalListDep[i].name + "</option>");
            }
            else {
                option = $("<option>" + globalListDep[i].name + "</option>");
            }
            selectDepartment.append(option);
        }

        var addButton = $('<input />', {
            class: "submit-button",
            type: 'button',
            value: 'Save',
            id: 'btn_add',
            on: {
                click: function () {
                    var name = document.getElementById("FirstNameInput").value;
                    var lName = document.getElementById("LastNameInput").value;
                    var dob = document.getElementById("DOBInput").value;
                    var salary = document.getElementById("SalaryInput").value;
                    var email = document.getElementById("EmailInput").value;
                    var id_dep = document.getElementById("DepartmentInput").value;

                    var employeeObj = {
                        "id": employee.id,
                        "firstName": name,
                        "lastName": lName,
                        "dob": dob,
                        "salary": salary,
                        "email": email,
                        "id_department": id_dep
                    };
                    employeeService.save(employeeObj).then(function (resp) {
                        if (resp.status == "SUCCESS") {
                            spanFirstName.text('');
                            service.getAll().then(function (data) {
                                form.drowListDepartments(data);
                            });
                        }
                        else {
                            spanFirstName.text(resp.result.name);
                        }
                    })
                }
            }
        });

        content.html(divForm);
        divForm.append(labelFirstName);
        divForm.append(divFirstName);
        divFirstName.append(inputFirstName);
        divFirstName.append(spanFirstName);

        divForm.append(labelLastName);
        divForm.append(divLastName);
        divLastName.append(inputLastName);
        divLastName.append(spanLastName);

        divForm.append(labelDOB);
        divForm.append(divDOB);
        divDOB.append(inputDOB);
        divDOB.append(spanDOB);

        divForm.append(labelSalary);
        divForm.append(divSalary);
        divSalary.append(inputSalary);
        divSalary.append(spanSalary);

        divForm.append(labelEmail);
        divForm.append(divEmail);
        divEmail.append(inputEmail);
        divEmail.append(spanEmail);

        divForm.append(labelDepartment);
        divForm.append(divDepartment);
        divDepartment.append(selectDepartment);
        divDepartment.append(spanDepartment);

        divForm.append(addButton);
    };
}