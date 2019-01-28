var app = app || {};

app.loginView = Backbone.View.extend({

    render: function(){
        this.$el.html("Hello World");
        return this;
    }
});