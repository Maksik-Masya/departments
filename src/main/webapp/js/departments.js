function Department() {
    this.departmentid;
    this.name;
}



$(document).ready(function () {
    getDepartmentsFromModel();
});



function getDepartmentsFromModel() {
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: "/myDepartment",
        dataType: 'json',
        success: function (data) {
            console.log("SUCCESS: ", data);
            drowDepartments(data);
        },
        error: function (e) {
            console.log("ERROR: ", e);
        },
        done: function (e) {
            console.log("DONE");
        }
    });
}

function drowDepartments(respons) {
    
    var div_tabl = $("<div/>");
    var table = $('<table id="myTable"  border="1" align="center"/>');
    $("#table-content").html(div_tabl);

    var tr = $("<tr/>");
    tr.append("<th>Name</th>");
    tr.append("<th colspan='2'>Action</th>");
    table.append(tr);

    $("tr:has(td)").remove();

    for (var i in respons) {

        var deleteButton = $('<input />', {
            type: 'button',
            value: 'Delete',
            id: 'btn_delete',
            name: respons[i].departmentid,
            on: {
                click: function () {
                    deleteDepartmentFunc(this.name)
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
                    addEditDepartmentFunc(this.name)
                }
            }
        });

        var newButton = $('<input />', {
            type: 'button',
            value: 'New Department',
            id: 'btn_new',
            on: {
                click: function () {
                    addEditDepartmentFunc();
                }
            }
        });
        
        var row = $("<tr/>");
        row.append("<td>" + respons[i].name + "</td>");
        var td1 = $("<td/>");
        td1.append(deleteButton);
        row.append(td1);
        var td2 = $("<td/>");        
        td2.append(editButton);
        row.append(td2);
        row.appendTo(table);
    }
    div_tabl.append(table);
    div_tabl.append(newButton);
}

function deleteDepartmentFunc(depID) {
    alert(depID)
    $.ajax({
        type: "POST",
        url: "/delDepartment",
        data: {departmentId: depID},
        dataType: 'json',
        success: function (data) {
            getDepartmentsFromModel();
            console.log("department: ", data);
        }
    });
}

function addEditDepartmentFunc(depID) {

    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/addEditDepartment",
        data: {departmentId: depID},
        dataType: 'json',
        success: function (data) {
            console.log("department: ", data);
            drowDepartmentForm(data);
        },
        error: function (e) {
            console.log("ERROR: ", "Not found");
            drowDepartmentForm('');
        }
    });
}

function drowDepartmentForm(department) {

    var depName = '';
    var depID = '';
    if(department != '') {
        depName = department.name;
        depID = department.departmentid;
    }

    var table_div = $('<div/>');
    $("#table-content").html(table_div);
    var table = $('<table id="myTable"  align="center"/>');

    var tr = $("<tr/>");
    tr.append("<th>Name Department</th>");
    var th = $("<th/>");
    var input_text = $('<input />',
        {
            id: "departm_name_input",
            type: 'text',
            value: depName,
        });

    
    var addButton = $('<input />', {
        type: 'button',
        value: 'New',
        id: 'btn_add',
        on: {
            click: function () {
                addEditModelDepartment(depID)
            }
        }
    });

    th.append(input_text);
    tr.append(th);
    table.append(tr);
    table_div.append(table);
    table_div.append(addButton);
}

function addEditModelDepartment( depID) {

    var depName = document.getElementById("departm_name_input").value;
    var department = {"departmentid" : depID, "name" : depName};
    
    $.ajax({
        type: "post",
        contentType: "application/json",
        url: "/saveDepartment",
        data: JSON.stringify(department),
        success: function () {
            getDepartmentsFromModel();
            console.log("result : add / edit success");
        }
    });
}

