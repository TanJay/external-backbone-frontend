var app = app || {};

app.collectionItemView = Backbone.View.extend({
    tagName: 'span',
    className: 'remove',
    render: function () {
        this.collection.each(this.addItem, this)
        return this;
    },
    addItem: function (wishItem) {
        var wishItemView = new app.singleItemView({ model: wishItem });
        this.$el.append(wishItemView.render().el);
    },
    removeItem: function(wishItem){
        this.remove(wishItem);
    }
});