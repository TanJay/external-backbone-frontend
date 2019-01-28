
var WishItem = Backbone.Model.extend({
    defaults: {
        name: "",
        url: "",
        price: "",
        priority: "",
        delivery_date: "",
        id: ""
    },
    idAttribute: "id",
    // Lets create function which will return the custom URL based on the method type
    getCustomUrl: function (method) {

        switch (method) {
            case 'create':
                return 'http://192.168.64.2/restservice/api/updatewish';
                break;
            case 'read':
                return 'http://192.168.64.2/restservice/api/wishbyid/' + this.id;
                break;
            case 'update':
                return 'http://192.168.64.2/restservice/api/updatewish';
                break;
            case 'delete':
                return 'http://192.168.64.2/restservice/api/deletewish/' + this.id;
                break;
            case 'add':
                return 'http://192.168.64.2/restservice/api/adduser' + this.id;
                break;
        }
    },

    // Now lets override the sync function to use our custom URLs
    sync: function (method, model, options) {
        options || (options = {});
        options.url = this.getCustomUrl(method);

        // Lets notify backbone to use our URLs and do follow default course
        return Backbone.sync.apply(this, arguments);
    }
});

// Backbone Collection

var Blogs = Backbone.Collection.extend({
    getCustomUrl: function (method) {

        switch (method) {
            case 'create':
                return 'https://localhost/wishlist-backend/api/wishlist';
                break;
            case 'read':
                return 'http://192.168.64.2/restservice/api/wishbyid/' + this.id;
                break;
            case 'update':
                return 'https://localhost/wishlist-backend/api/wishlist';
                break;
            case 'delete':
                return 'http://192.168.64.2/restservice/api/deletewish/' + this.id;
                break;
        }
    },

    // Now lets override the sync function to use our custom URLs
    sync: function (method, model, options) {
        options || (options = {});
        options.url = this.getCustomUrl(method);

        // Lets notify backbone to use our URLs and do follow default course
        return Backbone.sync.apply(this, arguments);
    }
});


// instantiate a Collection

var blogs = new Blogs();

// Backbone View for one blog

var BlogView = Backbone.View.extend({
    model: new WishItem(),
    tagName: 'tr',
    initialize: function () {
        this.template = _.template($('.blogs-list-template').html());
    },
    events: {
        'click .edit-blog': 'edit',
        'click .update-blog': 'update',
        'click .cancel': 'cancel',
        'click .delete-blog': 'delete'
    },
    edit: function () {
        $('.edit-blog').hide();
        $('.delete-blog').hide();
        this.$('.update-blog').show();
        this.$('.cancel').show();

        var name = this.$('.name').html();
        var url = this.$('.url').html();
        var priority = this.$('.priority').html();
        var price = this.$('.price').html();
        var userID = this.$('.userID').html();
        var del_date = this.$('.delivery_date').html();

        this.$('.name').html('<input type="text" class="form-control name-update" value="' + name + '">');
        this.$('.userId').html('<input type="text" class="form-control userID-update" value="' + userID + '">');
        this.$('.url').html('<input type="text" class="form-control url-update" value="' + url + '">');
        this.$('.priority').html('<input type="text" class="form-control priority-update" value="' + priority + '">');
        this.$('.price').html('<input type="text" class="form-control price-update" value="' + price + '">');
        this.$('.delivery_date').html('<input type="text" class="form-control delivery_date-update" value="' + del_date + '">');

    },
    update: function () {
        this.model.set('name', $('.name-update').val());
        this.model.set('userID', $('.userID-update').val());
        this.model.set('url', $('.url-update').val());
        this.model.set('priority', $('.priority-update').val());
        this.model.set('price', $('.price-update').val());
        this.model.set('delivery_date', $('.del_date-update').val());

        this.model.save({}, {
            success: function (model, respose, options) {
                console.log("The model has been saved to the server");
            },
            error: function (model, xhr, options) {
                console.log("Something went wrong while saving the model");
            }
        });
    },
    cancel: function () {
        blogsView.render();
    },
    delete: function () {
        this.model.destroy();
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

// Backbone View for all blogs

var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),
    initialize: function () {
        var self = this;
        this.model.on('add', this.render, this);
        this.model.on('change', function () {
            setTimeout(function () {
                self.render();
            }, 30);
        }, this);
        this.model.on('remove', this.render, this);
    },
    render: function () {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function (blog) {
            self.$el.append((new BlogView({ model: blog })).render().$el);
        });
        return this;
    }
});

var blogsView = new BlogsView();


$(document).ready(function() {
	$('.add-blog').on('click', function() {
		var blog = new WishItem({
			name: $('.name-input').val(),
			url: $('.url-input').val(),
			price: $('.price-input').val(),
                        userID: $('.userID-input').val(),
			priority: $('.priority-input').val(),
			delivery_date: $('.delivery_date-input').val()
		});
                blog.save({}, {
			type: "POST",
			success: function (model, respose, options) {
				console.log(respose);
				blog.set('id',respose);
				console.log(blog.toJSON());
			},
			error: function (model, xhr, options) {
				console.log("Something went wrong while saving the model");
			}
		});
		$('.name-input').val(),
		$('.url-input').val(),
		$('.price-input').val(),
                $('.userID-input').val(),
		$('.priority-input').val(),
		$('.delivery_date-input').val()
		console.log(blog.toJSON());
		blogs.add(blog);
	})
})