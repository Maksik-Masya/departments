var TextType = Class.extend({
    init: function (text) {
        this.text = text;
    },

    createElement: function () {
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
        return $('<input />',
            {
                id: 'departm_name_input',
                class: 'input-field',
                type: 'text',
                on: {
                    input: function () {
                       // $('#departmentFormForValid').validate(validatedRules);

                        $("#departmentFormForValid").validate(validatedRules);
                       // alert("dfdfdfdf");
                    }
                }

            });

        //if (this.text) {
        //    input.val(this.text);
        //}
        //
        //input.addClass('input-field');
        //return input;
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
        response.forEach(function (el) {
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
        this.config = config;
    },

    render: function () {

      //  console.log(this.config.validatedRules);


        this.divForm = $("<form id='departmentFormForValid' class='department-form'/>");



        this.config.container.html(this.divForm);

        this.config.fields.forEach($.proxy(function (i) {
            var el = i.type.createElement();

            el.data('name', i.label);

            var label = $('<label/>')
                .text(i.label)
                .addClass('tittle-field')
                .appendTo(this.divForm);

            $('<div/>')
                .appendTo(this.divForm)
                .append(el)
                .addClass("form-field");

        }, this));

       //$('#departmentFormForValid').validate(this.config.validatedRules);
    },

    getData: function () {
        var data = {};
        this.divForm.find('input, select').each(function () {
            var element = $(this);
            var text = element.val();
            var name = element.data('name');
            data[name] = text;
        });
        console.log(data);
        return data;
    }
});

var DepartmentDialog = Dialog.extend({
    init: function () {
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

        this._super({
            container: $("#content"),
            validatedRules: validatedRules,
            fields: [
                {label: 'Department name', type: new TextType('text')}
                // {label: 'Email', type: new DateType('2015/12/9')}
                //{label: 'xixi', type: new FixedSelectType(['a', 'b', 'c'])}
            ]
        });


    }


});

