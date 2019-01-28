var app = app || {};


app.wishlistItem = Backbone.Model.extend({
    url: "http://localhost/wishlist-backend/api/item",
    defaults:{
        "name":'fdsdsf',
        "description": "Description",
        "url": 'asdasdsad',
        "priority": 'asdasd',
        "priority_id": 'asdasd',
        "price": 'asdasda'
    }
});