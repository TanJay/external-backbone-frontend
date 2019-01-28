var app = app || {};

app.loginModel = Backbone.Model.extend({
    url: "http://localhost/wishlist-backend/api/login",
    defaults:{
        "email": "",
        "password": ""
    },
    // event: function(){

    // },
    // login:function(){
    //     this.email = $('#inputEmail').val();
    //     this.password = $('#inputPass').val();
    //     this.model.fetch();
    // },
    // success: function(){

    // }
});