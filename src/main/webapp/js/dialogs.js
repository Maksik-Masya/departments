var TextType = Class.extend({
    init: function (text) {
        this.text = text;
    },

    createElement: function () {
        var val = '';
        if (this.text) {
            val = this.text;
        }

        return $('<input />',
            {
                id: 'departm_name_input',
                class: 'input-field',
                type: 'text',
                value: val,
                on: {
                    input: function () {

                    }
                }

            });
    }
});

var DateType = TextType.extend({
    createElement: function () {
        var input = this._super();
        input.attr('placeholder', 'dd-MM-yyyy');
        return input;
    }
});

var FixedSelectType = TextType.extend({
    init: function (elements) {
        this.elements = elements;
    },

    createElement: function () {
        var select = $('<select/>');
        select.addClass('select-field');

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
    init: function (id) {
        this._super([]);
        this.id = id;
    },

    createElement: function () {
        this.select = this._super();
        $.ajax({
            type: "get",
            contentType: "application/json",
            url: "/myDepartment",
            dataType: 'json',
            success: $.proxy(this.processResponse, this)
        });
        return this.select;
    },

    processResponse: function (response) {
        for(var i in response) {
            var option;
            if (response[i].departmentid == this.id) {
                option = $("<option value='" + response[i].departmentid + "' selected>" +
                    response[i].name + "</option>");
            }
            else {
                option = $("<option value='" + response[i].departmentid + "'>" + response[i].name + "</option>");
            }
            option.appendTo(this.select);
        }
    }
});

var Dialog = Class.extend({
    init: function (config) {
        this.config = config;
    },

    render: function () {
        this.divForm = $("<form/>", {
            id: 'departmentFormForValid',
            class: 'department-form'
        });
        this.config.container.html(this.divForm);

        this.config.fields.forEach($.proxy(function (i) {
            var el = i.type.createElement();

            el.data('name', i.name);

            var label = $('<label/>')
                .text(i.label)
                .addClass('tittle-field')
                .appendTo(this.divForm);

            $('<div/>')
                .appendTo(this.divForm)
                .append(el)
                .addClass("form-field");

        }, this));

        var btn = this.config.btnSave.createElement(this);
        this.divForm.append(btn);
        var btnC = this.config.btnCancel.createElement(this);
        this.divForm.append(btnC);
    },

    getData: function () {
        var data = {};
        this.divForm.find('input, select').each(function () {
            var element = $(this);
            var text = element.val();
            var name = element.data('name');
            data[name] = text;
        });
        return data;
    }
});

var DepartmentDialog = Dialog.extend({
    init: function (data) {
        this._super({
            container: $("#content"),
            btnSave: new ButtonSaveDepartment(),
            btnCancel: new ButtonCancelDepartment(),
            departmentID: data.departmentid,
            fields: [
                {label: 'Department name', type: new TextType(data.name), name: 'departmentName'}
            ]
        });
    }
});

var EmployeeDialog = Dialog.extend({
    init: function (data) {
        var content = $('#content');
        content.addClass("department-table-form");
        content.removeClass("employee-table-form");
        var birthdayVar = new Date(data.dob);
        var formatedDate = birthdayVar.getFullYear() + "-" + (birthdayVar.getMonth() + 1) + "-" + birthdayVar.getDate();
        this._super({
            container: content,
            btnSave: new ButtonSaveEmployee(),
            btnCancel: new ButtonCancelEmployee(data.department.departmentid),
            employeeID: data.id,
            fields: [
                {label: 'First name', type: new TextType(data.firstName), name: 'firstName'},
                {label: 'Last name', type: new TextType(data.lastName), name: 'lastName'},
                {label: 'Birthday', type: new DateType(formatedDate), name: 'dob'},
                {label: 'Salary', type: new TextType(data.salary), name: 'salary'},
                {label: 'Email', type: new TextType(data.email), name: 'email'},
                {label: 'Department', type: new AjaxSelectType(data.department.departmentid), name: 'departmentid'}
            ]
        });
    }
});

