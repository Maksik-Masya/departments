var ButtonHandler = Class.extend({
    init: function () {
    },

    depTable: function (event) {
        var dep = event.data.dep;
        var action = event.target.id;

        if (action === "btn_del") {
            (new DepartmentService()).deleteDep(dep);
        } else if (action === "btn_upd") {
            (new FormDraw()).drawDepartmentForm(dep);
        } else if (action === "bnt_list_empl") {
            (new EmployeeService()).getAll(dep.departmentid);
        }
    },

    depAddBtn: function (event) {
        var action = event.target.id;
        if ("btn_add_dep" === action) {
            (new FormDraw()).drawDepartmentForm();
        }
    },

    employeeTable: function (event) {
        var emp = event.data.empl;
        var depID = event.data.depID;
        var action = event.target.id;

        if (action === "btn_del") {
            (new EmployeeService()).deleteEmployee(emp.id);
        } else if (action === "btn_upd") {
            (new FormDraw()).drawEmployeeForm(emp, depID);
        }
    },

    emplAddBtn: function (event) {

        var depID = event.data.depID;
        var action = event.target.id;

        if ("addNewEmployee" === action) {
            (new FormDraw()).drawEmployeeForm(null, depID);

        } else if ("redirectByDep" === action) {
           // DepartmentServer.prototype.showList();
        }
    }

})
;
