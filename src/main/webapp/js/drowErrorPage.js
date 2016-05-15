var ErrorPage = Class.extend({
    init: function () {
        var content = $('#content')
            .removeClass("department-table-form")
            .removeClass("employee-table-form")
            .html($('<div/>')
                .addClass('error-message')
                .append(
                    $('<h1>Sorry, DB is not available now</h1>')));
    }
});