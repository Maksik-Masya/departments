var Table = Class.extend({

    init: function (config) {
        // {container: obj, fields: [{label: '', type: '', renderFunction: func}]}
        this.config = config;
    },

    render: function () {
        if (!this.isRendered) {

            var div = this.div = $('<table border="1"/>').appendTo(this.config.container);

            var trNameColumn = $('<tr/>').appendTo(div);
            this.config.columnsName.forEach($.proxy(function (i) {
                trNameColumn.append("<th>" + i.name + "</th>");
            }, this));

            var rows = this.config.rows;
            for (var data in rows) {

                var object = rows[data];
                var tr = $('<tr/>').appendTo(div);

                for (var field in object) {
                    tr.append("<td>" + object[field] + "</td>");
                }

                this.config.buttons.forEach(function (i) {
                    var btn = i.button.createElement();
                    tr.append(btn);
                });

                this.isRendered = true;
            }
        }
    }
});

var DepartmentTable = Table.extend({

    init: function (listDepartments) {

        this.listDep = listDepartments;
        console.log("log", this.listDep);

        this._super({
            container: $('.department-table-form'),

            columnsName: [
                {name: 'Name'}
            ],
            rows: this.listDep,
            buttons: [
                {button: new ButtonType('cancel')},
                {button: new ButtonType('save')}
            ]
        });
    }
});

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

        //input.addClass('input-field');
        return btn;
    }

});


/*
 function DepartmentForm() {

 var validatedRules = {
 rules: {
 departm_name_input: {
 required: true,
 minlength: 3
 }
 }, messages: {
 departm_name_input: {
 minlength: "Min length is 3",
 required: "This is required field"
 }
 }
 };

 DepartmentForm.prototype.drowListDepartments = function (respons) {

 var content = $("#table-content");
 content.removeClass("employee-table-form");
 content.addClass("department-table-form");
 var divTable = $("<div/>");
 var table = $('<table id="myTable" border="1"/>');
 table.addClass("department-table-container");
 content.html(divTable);

 var tr = $("<tr/>");
 tr.append("<th>Name</th>");
 tr.append("<th colspan='3'>Action</th>");
 table.append(tr);

 for (var i in respons) {
 var deleteButton = $('<input />', {
 type: 'button',
 value: 'Delete',
 id: 'btn_delete',
 name: respons[i].departmentid,
 on: {
 click: function () {
 service.delete(this.name).then(function () {
 service.getAll().then(function (data) {
 form.drowListDepartments(data);
 }, function () {
 form.drowListDepartments('');
 });
 }, function () {
 form.drowListDepartments('');
 });
 }
 }
 });

 var editButton = $('<input />', {
 type: 'button',
 value: 'Edit',
 id: 'btn_edit',
 name: respons[i].departmentid,
 on: {
 click: function () {
 service.isExist(this.name).then(function (data) {
 form.drowDepartmentForm(data);
 $('#departmentFormForValid').validate(validatedRules);
 }, function () {
 form.drowDepartmentForm('');
 });
 }
 }
 });

 var listButton = $('<input />', {
 type: 'button',
 value: 'Employees',
 id: 'btn_list',
 name: respons[i].departmentid,
 on: {
 click: function () {
 var idDep = this.name;
 employeeService.getAll(idDep).then(function (data) {
 employeeForm.drowList(data, idDep);
 }, function () {
 employeeForm.drowList('', idDep);
 });
 }
 }
 });

 var row = $("<tr/>");
 row.append("<td>" + respons[i].name + "</td>");
 var td1 = $("<td align='center'/>");
 td1.append(deleteButton);
 row.append(td1);
 var td2 = $("<td align='center'/>");
 td2.append(editButton);
 row.append(td2);
 var td3 = $("<td align='center'/>");
 td3.append(listButton);
 row.append(td3);
 row.appendTo(table);
 }

 var newButton = $('<input />', {
 type: 'button',
 value: 'Create',
 id: 'btn_new',
 on: {
 click: function () {
 form.drowDepartmentForm('');
 $('#departmentFormForValid').validate(validatedRules);
 }
 }
 });
 divTable.append(table);
 divTable.append(newButton);
 };

 DepartmentForm.prototype.drowDepartmentForm = function (dep) {
 var depID = dep.departmentid;
 var depName = dep.name;

 var divForm = $("<form id='departmentFormForValid' class='department-form'/>");
 var divField = $("<div class='form-field'/>");
 var label = $("<label for='name' class='tittle-field'>Department Name</label>");
 var spanName = $("<span class='error'/>");
 var inputName = $("<input/>",
 {
 class: "input-field",
 id: "departm_name_input",
 name: "departm_name_input",
 type: 'text',
 value: depName,
 on: {
 input: function () {
 $('#departmentFormForValid').valid();
 spanName.text('');
 }
 }
 });

 var saveButton = $('<input />', {
 class: "submit-button",
 type: 'button',
 value: 'Save',
 id: 'btn_add',
 on: {
 click: function () {
 if ($('#departmentFormForValid').valid()) {
 depName = document.getElementById("departm_name_input").value;
 var departmentObj = {"departmentid": depID, "name": depName};
 service.save(departmentObj).then(function (resp) {
 if (resp.status == "SUCCESS") {
 spanName.text('');
 service.getAll().then(function (data) {
 form.drowListDepartments(data);
 });
 }
 else {
 spanName.text(resp.result.name);
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
 id: 'btn_cancel',
 on: {
 click: function () {
 service.getAll().then(function (data) {
 form.drowListDepartments(data);
 });
 }
 }
 });

 $("#table-content").html(divForm);
 divForm.append(label);
 divForm.append(divField);
 divField.append(inputName);
 divField.append(spanName);
 divForm.append(saveButton);
 divForm.append(cancelButton);
 };
 }

 var form = new DepartmentForm();
 var service = new DepartmentService();

 var employeeService = new EmployeeService();
 var employeeForm = new EmployeeForm();

 var globalListDep;
 service.getAll().then(function (data) {
 globalListDep = data;
 form.drowListDepartments(data);
 }, function () {
 form.drowListDepartments('');
 });

 */
