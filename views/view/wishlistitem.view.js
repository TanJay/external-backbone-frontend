var app = app || {};

app.singleItemView = Backbone.View.extend({
    tagName: 'tr',
    className: 'removeMe',
    template: _.template($('#wishListItem').html()),
    initialize: function () {
        this.template = _.template($('#wishListItem').html());
    },
    events: {
        'click .edit': 'edit',
        'click .delete': 'delete'
    },
    edit: function () {
        console.log(this.model.attributes);
        $('#itemName').val(this.model.attributes.name);
        $('#itemURL').val(this.model.attributes.url);
        $('#itemPriority').val(this.model.attributes.priority_id);
        $('#itemPrice').val(this.model.attributes.price);
        $("#exampleModal").modal('toggle');
    },
    delete: function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                collection.remove(this.model);
                itemView.removeItem(this.model);
                $('#itemlist').html(itemView.render().el);
                $(".removeMe").unwrap()
                $('#example').DataTable()
                this.model.destroy({ url: 'http://localhost/wishlist-backend/api/item/' + this.model.id })
                    .then((x) => {
                        console.log(x);
                    }, (err) => {
                        console.log("err", err);
                    });

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })

    },
    render: function () {
        var template;
        try {
            template = this.template(this.model.toJSON())

        } catch (err) {
            template = this.template(this.model)
        }
        this.$el.html(template);
        return this;
    },
});