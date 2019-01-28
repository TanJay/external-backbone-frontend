Backbone.$.ajaxSetup({
    headers: {'X-API-KEY': window.localStorage.getItem('token')}
});