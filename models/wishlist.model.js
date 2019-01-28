var app = app || {};

app.wishlist = Backbone.Model.extend({
    url: "http://localhost/wishlist-backend/api/wishlist",
    defaults:{
        "status": null,
        "message": null,
        "data": {
            "added_date": null,
            "id": null,
            "name": null,
            "price": null,
            "priority_id": null,
            "updated_date": null,
            "url": null,
            "wishlist_id": null
        }
    },
    initialize: function(props) { 
        this.url = props.url;
    },
    parse: function(resp, xhr) {
        // console.log("resp", resp.data);
        return resp;
    }
});