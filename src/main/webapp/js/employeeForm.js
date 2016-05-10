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
                required: true,
                date: true
            },
            SalaryInput: {
                required: true,
                number: true
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
                required: "This is required field",
                number: "Must be numerical"
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

    EmployeeForm.prototype.drowList = function (respons, idDepartment) {

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
                            employeeForm.drowEmployeeForm(data, idDepartment);
                            $('#employeeFormForValid').validate(validatedRules);
                        }, function () {
                            console.log("employee is not exist");
                            employeeForm.drowEmployeeForm('');
                        });
                    }
                }
            });

            var birthdayVar = new Date(respons[i].dob);
            var row = $("<tr/>");
            row.append("<td>" + respons[i].firstName + "</td>");
            row.append("<td>" + respons[i].lastName + "</td>");
            row.append("<td>" + birthdayVar.getFullYear() + "-" + (birthdayVar.getMonth() + 1) + "-" + birthdayVar.getDate() + "</td>");
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

        var listDepButton = $('<input />', {
            class: 'listDepButtonCSS',
            type: 'button',
            value: 'Departments',
            id: 'btn_list',
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

        var newEmplButton = $('<input />', {
            class: 'listDepButtonCSS',
            type: 'button',
            value: 'Create',
            id: 'btn_new',
            on: {
                click: function () {
                    employeeForm.drowEmployeeForm('', idDepartment);
                    $('#employeeFormForValid').validate(validatedRules);
                }
            }
        });
        divTable.append(table);
        divTable.append(listDepButton);
        divTable.append(newEmplButton);
    };

    EmployeeForm.prototype.drowEmployeeForm = function (employee, idDepartment) {
        var content = $("#table-content");
        content.addClass("department-table-form");
        content.removeClass("employee-table-form");
        var divForm = $("<form id='employeeFormForValid' class='department-form'/>");

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
        var emplDOB = '';
        if (employee != '') {
            var birthdayVar = new Date(employee.dob);
            emplDOB = birthdayVar.getFullYear() + "-" + (birthdayVar.getMonth() + 1) + "-" + birthdayVar.getDate();
        }
        var inputDOB = $("<input />",
            {
                class: "input-field",
                id: "DOBInput",
                name: "DOBInput",
                type: 'text',
                placeholder: 'yyyy-MM-dd',
                value: emplDOB,
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
        var selectDepartment = $("<select class='select-field' id='DepartmentInput' />",
            {
                class: "input-field",
                name: "DepartmentInput"
            });

        for (var i in globalListDep) {
            var option;
            if (globalListDep[i].departmentid == idDepartment) {
                option = $("<option value='" + globalListDep[i].departmentid + "' selected>" +
                    globalListDep[i].name + "</option>");
            }
            else {
                option = $("<option value='" + globalListDep[i].departmentid + "'>" + globalListDep[i].name + "</option>");
            }
            selectDepartment.append(option);
        }

        var saveButton = $('<input />', {
            class: "submit-button",
            type: 'button',
            value: 'Save',
            id: 'btn_add',
            on: {
                click: function () {
                    if ($('#employeeFormForValid').valid()) {

                        var name = document.getElementById("FirstNameInput").value;
                        var lName = document.getElementById("LastNameInput").value;
                        var dob = document.getElementById("DOBInput").value;
                        var salary = document.getElementById("SalaryInput").value;
                        var email = document.getElementById("EmailInput").value;
                        var depID = document.getElementById("DepartmentInput");
                        var depOpt = depID.options[depID.selectedIndex];

                        //correct date format for DB
                        dob = dob.replace(/\//g, "-");
                        dob = dob.replace(/\./g, "-");

                        var employeeObj = {
                            "id": employee.id,
                            "firstName": name,
                            "lastName": lName,
                            "dob": dob,
                            "salary": salary,
                            "email": email,
                            "department": {
                                "name": depOpt.text,
                                "departmentid": depOpt.value
                            }
                        };

                        employeeService.save(employeeObj).then(function (resp) {
                            if (resp.status == "SUCCESS") {
                                spanFirstName.text('');
                                employeeService.getAll(depOpt.value).then(function (data) {
                                    employeeForm.drowList(data);
                                }, function () {
                                    employeeForm.drowList('');
                                });
                            }
                            else {
                                var result = resp.result;
                                if (result.email != undefined) {
                                    spanEmail.text(result.email);
                                }
                            }
                        })
                    }
                }
            }
        });

        var cancelButton = $('<input />', {
            class: "cancel-button",
            type: 'button',
            value: 'Cancel',
            id: 'btn_cancelkkj',
            on: {
                click: function () {
                    employeeService.getAll(idDepartment).then(function (data) {
                        employeeForm.drowList(data);
                    }, function () {
                        employeeForm.drowList('');
                    });
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

        divForm.append(saveButton);
        divForm.append(cancelButton);
    };
}

//----------------------------------------------------------------------------------------------------------------------
/*
var TextType = Class.extend({
    init: function (text) {
        this.text = text;
    },

    createElement: function () {
        var input = $('<input/>');

        if (this.text) {
            input.val(this.text);
        }

        //input.addClass('input-field');
        return input;
    }
});

var DateType = TextType.extend({
    createElement: function () {
        var input = this._super();

        input.attr('placeholder', 'dd/MM/yyyy');

        return input;
    }
});

var FixedSelectType = TextType.extend({
    init: function (elements) {
        this.elements = elements;
    },

    createElement: function () {
        var select = $('<select/>');

        this.elements.forEach(function (el) {
            $('<option/>')
                .text(el)
                .val(el)
                .appendTo(select);
        });

        return select;
    }
});

var AjaxSelectType = FixedSelectType.extend({
    init: function (url) {
        this._super([]);

        this.url = url;
    },

    createElement: function () {
        this.select = this._super();

        $.ajax({
            url: url,
            success: $.proxy(this.processResponse, this)
        });
        return this.select;
    },

    processResponse: function (response) {

        response.forEach(proxy(function () {
            $('<option/>')
                .text(el)
                .val(el)
                .appendTo(this.select);
        }, this));
    }
});

var proxy = function (fn, context) {
    return function () {
        fn.call(context);
    }
};

var DepartmentSelectType = FixedSelectType.extend({
    processResponse: function (response) {
        response.forEach(function () {
            $('<option/>')
                .text(el.id)
                .val(el.sdfsdf)
                .appendTo(this.select);
        });
    }
});

var EventSupport = Class.extend({
    
    subscribe: function (event, handler, context) {
        $(this).on(event, $.proxy(handler, context));
    },

    fire: function (event, data) {
        $(this).trigger(event, data);
    }
});

var Dialog = EventSupport.extend({
    init: function (config) {
        // {container: obj, fields: [{label: '', type: '', renderFunction: func}]}
        this.config = config;
    },

    render: function () {
        if (!this.isRendered) {
            var div = this.div = $('<div/>').appendTo(this.config.container);

            this.fire('start-rendering', {dialog: this, div: div});

            this.config.fields.forEach($.proxy(function (i) {
                var el = i.type.createElement();

                el.data('name', i.label);

                var label = $('<label/>').text(i.label);
                label.addClass('tittle-field');

                var element = $('<div/>')
                    .appendTo(div)
                    .append(label)
                    .append(el);

                this.fire('element-render', {dialog: this, div: div, element: element});
            }, this));

            this.fire('stop-rendering', "ddddddd");
            
            $(this).trigger("mytest", { name: 'ssdsdsd', name3 :'ssssss', name2:'ddddddddddd'});
            
            this.isRendered = true;
        }
    },

    getData: function () {
        var data = {};
        this.div.find('input, select').each(function () {
            var element = $(this);
            var text = element.val();
            var name = element.data('name');
            data[name] = text;
        });
        return data;
    }
});

var DepartmentDialog = Dialog.extend({
    init: function () {
        this._super({
            container: $('body'), fields: [
                {label: 'xaxa', type: new TextType('text')},
                {label: 'xoxo', type: new DateType('')},
                {label: 'xixi', type: new FixedSelectType(['a', 'b', 'c'])}
            ]
        });

       // this.subscribe('stop-rendering', this.onStopRender, this);

        $(this).on("mytest" , function(event, param) {

            console.log('name',param.name);
            console.log('name2',param.name2);
            console.log('name3',param.name3);
        
        });
                
    }

   
});

*/


