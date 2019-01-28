var app = app || {};


$('#registerButton').click(function(e){

    var registerUser = new app.registerModel({
        'username': $('#username').val(),
        'password': $('#password').val(),
        'email': $('#email').val(),
    });

    registerUser.save({}, {
        success: function (model, response, options) {
            Swal.fire(
                'Good job!',
                'Saved Successfully',
                'success'
            );
        },
        error: function (model, xhr, options) {
            console.log(model);
            Swal.fire(
                'Failed!',
                'Failed to save the !',
                'error'
            )
            console.log("Something went wrong while saving the model");
        }
    });

});