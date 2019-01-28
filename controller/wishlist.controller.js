var app = app || {};

var collection;
var itemView;
var dr;

new app.wishlist({ url: "http://localhost/wishlist-backend/api/wishlist" }).fetch({
    success: (result) => {
        collection = new app.itemCollection(result.toJSON().data.itemLists);
        var model = new app.shareModel({
            "share": "http://localhost/wishlist-frontend/views/login.html#share/" + result.toJSON().data['wishlist_list_id']
        });
        $('#shareURLPlaceholder').html('<a href="' + model.get('share') + '"><p>' + model.get('share') + '</p>')
        itemView = new app.collectionItemView({ collection: collection });
        $('#itemlist').html(itemView.render().el);
        $(".removeMe").unwrap()
        dr = $('#example').DataTable();
    }
});