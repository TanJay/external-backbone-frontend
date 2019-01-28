var app = app || {};

app.registerModel = Backbone.Model.extend({
    url: 'http://localhost/wishlist-backend/api/register',
    defaults: {
        "username" : null,
        "password" : null,
        "email" : null
    }
});