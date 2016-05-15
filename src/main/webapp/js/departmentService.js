var DepartmentService = Class.extend({
    init: function () {
    },

    getAll: function () {
        $.ajax({
            type: "get",
            contentType: "application/json",
            url: "/listDepartments",
            dataType: 'json',
            success: function (data) {
                (new TableDraw()).drawDepartmentTable(data);
            },
            error: function () {
                new ErrorPage();
            }
        });
    },

    deleteDepartment: function (dep) {
        var thisObj = this;
        var id = dep.departmentid;
        $.ajax({
            url: "/delDepartment",
            type: 'POST',
            dataType: 'json',
            data: {departmentId: id},
            success: function () {
                thisObj.getAll();
            },
            error: function () {
                new ErrorPage();
            }
        });
    },

    saveDepartment: function () {
        var departmentData = {};
        $("#departmentFormForValid").find("input").each(function (i, obj) {
            departmentData[obj.name] = $(obj).val();
        });

        var thisObj = this;
        $.ajax({
            url: "/saveDepartment",
            type: 'POST',
            data: JSON.stringify(departmentData),
            contentType: "application/json",
            success: function () {
                thisObj.getAll();
            },
            error: function () {
                new ErrorPage();
            }
        });
    },

    setValidator: function () {
        var thisObj = this;
        $('#departmentFormForValid').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 3,
                    remote: {
                        url: "/uniqDepartmentName",
                        type: "get",
                        contentType: "application/json",
                        data: {
                            id: function () {
                                return $("#id").val();
                            }
                        }
                    }
                }
            },
            messages: {
                name: {
                    minlength: "Min length is 3",
                    required: "This is required field",
                    remote: "Name already in use"
                }
            },
            submitHandler: function () {
                thisObj.saveDepartment()
            }
        });
    }

});