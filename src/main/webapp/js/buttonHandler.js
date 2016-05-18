var ButtonHandler = Class.extend({
    init: function () {
    },

    depTable: function (event) {
        var dep = event.data.dep;
        var action = event.target.id;

        if (action === "btnDelete") {
            (new DepartmentService()).deleteDepartment(dep);
        } else if (action === "btnUpdate") {
            (new FormDraw()).drawDepartmentForm(dep);
        } else if (action === "bntListEmpl") {
            (new EmployeeService()).getAll(dep.departmentid);
        }
    },

    depAddBtn: function (event) {
        var action = event.target.id;
        if (action === "btnAddDep") {
            (new FormDraw()).drawDepartmentForm();
        }
    },

    employeeTable: function (event) {
        var emp = event.data.empl;
        var depID = event.data.depID;
        var action = event.target.id;

        if (action === "btnDelete") {
            (new EmployeeService()).deleteEmployee(emp.id);
        } else if (action === "btnUpdate") {
            (new FormDraw()).drawEmployeeForm(emp, depID);
        }
    },

    emplAddBtn: function (event) {

        var depID = event.data.depID;
        var action = event.target.id;

        if (action === "addNewEmployee") {
            (new FormDraw()).drawEmployeeForm(null, depID);

        } else if (action === "backToDep") {
            (new DepartmentService()).getAll();
        }
    }

})
;
