// var user = new app.loginModel({
//     "email": $('#inputEmail').val(),
//     "password": $('#inputPass').val(),
// })
var appRouter = new app.router();
Backbone.history.start();


$('#loginSubmit').click(()=>{
    var user = new app.loginModel({
        "email": $('#inputEmail').val(),
        "password": $('#inputPass').val(),
    })
    user.save({}, {
        success: function (model, response, options) {
            window.localStorage.setItem('token', response.data.token);
            window.localStorage.setItem('userLevel', response.data.userType);
            appRouter.navigate('dashboard', {trigger: true});
        },
        error: function (model, xhr, options) {
            console.log("Something went wrong while saving the model");
        }
    });   
});

