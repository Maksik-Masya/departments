$(document).ready(function () {
    $.ajax({
        type: "get",
        contentType: "application/json",
        url: "/myDepartment",
        dataType: 'json',
        success: function (data) {
            console.log("SUCCESS: ", data);
            showDepartments(data);
        },
        error: function (e) {
            console.log("ERROR: ", e);
        },
        done: function (e) {
            console.log("DONE");
        }
    });
});



function showDepartments(data) {

    $("tr:has(td)").remove();

    $.each(data, function (index, data) {
        var td_name = $("<td/>").html(data.name);

        var deleteButton = $("<input/>", {
            type: "button",
            id: "deleteB",
            value: "delete"
        });

        var ubpadeButton = $("<input/>", {
            type: "button",
            id: "updateB",
            value: "update"
        });

        //var ubpadeButton = $("<input/>")
        //    .attr('type', 'submit')
        //    .val('update')
        //    .on('click', this.)

        //$('<input/>')
        //    .attr('type', 'submit')
        //    .addClass('send')
        //    .val('Send')
        //    .on('click', this.createDepartment)
        //    .appendTo(form);

        $("#department-table").append($('<tr/>')
            .append($('<td/>').html("<a href=' " + data.url + " '>" + data.name + "</a>"))
            .append(ubpadeButton)
            .append(deleteButton)
        );
    });

    $("#department-table").on("click", "#deleteB", function () {
        var selected = $(this).attr('class') || $(this).attr('id');
        alert(selected);
    });

    $("#department-table").on("click", "#updateB", function () {
        var selected = $(this).attr('class') || $(this).attr('id');
        alert(selected);
    });
}