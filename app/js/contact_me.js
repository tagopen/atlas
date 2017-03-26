$(function() {

    $(".contactForm input,.contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            $form.find("[type=submit]").prop("disabled", true).button('loading'); //prevent submit behaviour and display preloading
            // get values from FORM
            var form = $form.attr("name");
            var name = $form.find("[name=name]").val();
            var email = $form.find("[name=email]").val();
            var phone = $form.find("[name=phone]").val();
            var message = $form.find("[name=message]").val();
            var $radio  = $form.find('.question__radio-group [type=radio]');
            var speekMethod = '';

            $radio.foreach(function() {
               if ($(this).prop("checked")) {
                 speekMethod = $(this).val();
               }
            });

            // Check for white space in name for Success/Fail message
            $.ajax({
                url: "././mail/contact_me.php",
                type: "POST",
                data: {
                    form: form,
                    name: name,
                    phone: phone,
                    email: email,  
                    message: message,
                    speekMethod: speekMethod
                },
                cache: false,
                success: function() {
                    // Success message
                    $form.find('.success').html("<div class='alert alert-success'>");
                    $form.find('.success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $form.find('.success > .alert-success')
                        .append("<strong>Ваше сообщение успешно отправлено. В ближайшее время наши менеджеры свяжутся с вами! </strong>");
                    $form.find('.success > .alert-success')
                        .append('</div>');

                    // remove prevent submit behaviour and disable preloading
                    $form.find("[type=submit]").prop("disabled", false).button('reset');  

                    //clear all fields
                    $form.find('.contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $form.find('.success').html("<div class='alert alert-danger'>");
                    $form.find('.success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $form.find('.success > .alert-danger').append("<strong>Приносим свои извинения, но наш почтовый сервер времено не работает. Попробуйте, отправить сообщение еще раз и сообщите нам о проблеме!");
                    $form.find('.success > .alert-danger').append('</div>');

                    // remove prevent submit behaviour and disable preloading
                    $form.find("[type=submit]").prop("disabled", false).button('reset'); 

                    //clear all fields
                    $form.find('.contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $form.find('.success').html('');
});
