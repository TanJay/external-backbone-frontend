var app = app || {};

app.router = Backbone.Router.extend({

    routes: {
        "" : "loginPage",
        "login": "loginPage",
        "register": "registerPage",
        "dashboard": "dashboardPage",
        "logout": "logoutPage",
        "share/:id": "sharePage"
    }, 
    loginPage: function(){
        if(typeof window.localStorage.getItem('userLevel') !== 'undefined' && window.localStorage.getItem('userLevel') === 'CUSTOMER'){
            appRouter.navigate('dashboard', {trigger: true});
            return;
        }
        var loginPage = '<div class="container-fluid"> <div class="row full-height-vh"> <div class="col-12 d-flex align-items-center justify-content-center"> <div class="card gradient-indigo-purple text-center width-400"> <div class="card-img overlap"> <img alt="element 06" class="mb-1" src="app-assets/img/portrait/avatars/avatar-08.png" width="190"> </div> <div class="card-body"> <div class="card-block"> <h2 class="white">Login</h2> <form> <div class="form-group"> <div class="col-md-12"> <input type="email" class="form-control" name="inputEmail" id="inputEmail" placeholder="Email" required > </div> </div><div class="form-group"> <div class="col-md-12"> <input type="password" class="form-control" name="inputPass" id="inputPass" placeholder="Password" required> </div> </div><div class="form-group"> <div class="row"> <div class="col-md-12"> <div class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0 ml-3"> <input type="checkbox" class="custom-control-input" checked id="rememberme"> <label class="custom-control-label float-left white" for="rememberme">Remember Me</label> </div> </div> </div> </div><div class="form-group"> <div class="col-md-12"> <button id="loginSubmit" type="button" class="btn btn-pink btn-block btn-raised">Submit</button> <button type="button" class="btn btn-secondary btn-block btn-raised">Cancel</button> </div> </div> </form> </div> </div> <div class="card-footer"> <div class="float-right"><a (click)="onRegister()" class="white">New User?</a></div> </div> </div> </div> </div> </div>';
        $("#login").html(loginPage);
    },
    registerPage: function(){
        if(typeof window.localStorage.getItem('userLevel') !== 'undefined' && window.localStorage.getItem('userLevel') === 'CUSTOMER'){
            appRouter.navigate('dashboard', {trigger: true});
            return;
        }
        var registerPage = '<div class="container"> <div class="row full-height-vh"> <div class="col-12 d-flex align-items-center justify-content-center"> <div class="card"> <div class="card-body"> <div class="row d-flex"> <div class="col-12 col-sm-12 col-md-6 gradient-deep-orange-orange"> <div class="card-block"> <div class="card-img overlap"> <img alt="Card image cap" src="app-assets/img/elements/13.png" width="350" class="mx-auto d-block"> </div> <h2 class="card-title font-large-1 text-center white mt-3">Registration</h2> </div> </div> <div class="col-12 col-sm-12 col-md-6 d-flex align-items-center"> <div class="card-block mx-auto"> <form > <div class="input-group mb-3"> <div class="input-group-prepend"> <span class="input-group-text"> <i class="icon-user"></i> </span> </div> <input type="text" class="form-control" name="fname" id="username" placeholder="Name" required > </div> <div class="input-group mb-3"> <div class="input-group-prepend"> <span class="input-group-text"> <i class="ft-mail"></i> </span> </div> <input type="email" class="form-control" name="inputEmail" id="email" placeholder="Email" required > </div> <div class="input-group mb-3"> <div class="input-group-prepend"> <span class="input-group-text"> <i class="ft-lock"></i> </span> </div> <input id="password" type="password" class="form-control" name="inputPass" id="inputPass" placeholder="Password" required > </div> <div class="form-group col-sm-offset-1"> <div class="custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0"> <input type="checkbox" class="custom-control-input" checked id="terms"> <label class="custom-control-label pl-2" for="terms">I agree <a>terms and conditions</a></label> </div> </div> <div class="form-group text-center"> <button id="registerButton" type="button" class="btn btn-warning btn-raised">Get Started</button> </div> </form> </div> </div> </div> </div> </div> </div> </div> </div>';
        $("#login").html(registerPage);
    },
    dashboardPage: function(){
        if( typeof window.localStorage.getItem('userLevel') == 'undefined' || window.localStorage.getItem('userLevel') !== 'CUSTOMER'){
            appRouter.navigate('login', {trigger: true});
            return;
        }
        // var dashboardPage = '<div data-active-color="black" data-background-color="white" data-image="" class="app-sidebar"> <div class="sidebar-header"> <div class="logo clearfix"><a href="index.html" class="logo-text float-left"> <div class="logo-img"><img src="app-assets/img/logo-dark.png" /></div><span class="text align-middle">WishList</span> </a><a id="sidebarToggle" href="javascript:;" class="nav-toggle d-none d-sm-none d-md-none d-lg-block"><i data-toggle="expanded" class="ft-toggle-right toggle-icon"></i></a><a id="sidebarClose" href="javascript:;" class="nav-close d-block d-md-block d-lg-none d-xl-none"><i class="ft-x"></i></a></div> </div> <div class="sidebar-content"> <div class="nav-container"> <ul id="main-menu-navigation" data-menu="menu-navigation" class="navigation navigation-main"> <li class=" nav-item"><a href="#dashboard"><i class="ft-home"></i><span data-i18n="" class="menu-title">Dashboard</span></a> </li> <li class="has-sub nav-item"><a href="#dashboard"><i class="fa fa-sticky-note-o"></i><span data-i18n="" class="menu-title">WishList</span><span class="tag badge badge-pill badge-danger float-right mr-1 mt-1">1</span></a> <ul class="menu-content"> <li class="active"><a href="#" data-toggle="modal" data-target="#exampleModal" class="menu-item">Add</a> </li> <li><a href="#dashboard" class="menu-item">Edit</a> </li> <li><a href="#dashboard" data-toggle="modal" data-target="#shareModel" class="menu-item">Share</a> </li> </ul> </li> </ul> </div> </div> <div class="sidebar-background"></div> </div> <!-- Modal --> <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Wish List</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> <div class="card"> <div class="card-header"> <h4 class="card-title">Add New Wish List</h4> </div> <div class="card-body" aria-expanded="true"> <div class="card-block"> <form class="form"> <div class="form-body"> <h4 class="form-section"><i class="ft-user"></i> Item Information </h4> <div class="row"> <div class="col-md-12"> <div class="form-group"> <label for="projectinput1">Item Name</label> <input id="itemName" type="text" name="recordName" class="form-control"> </div> </div> </div> <div class="row"> <div class="col-md-12"> <div class="form-group"> <label for="projectinput1">URL</label> <input id="itemURL" type="text" name="recordName" class="form-control"> </div> </div> </div> <div class="row"> <div class="col-md-6"> <div class="form-group"> <label for="projectinput5">Priority</label> <select id="itemPriority" name="recordType" class="form-control"> <option value="1" disabled="">NONE</option> <option value="2">HIGH</option> <option value="3">MEDIUM</option> <option value="4">LOW</option> </select> </div> </div> <div class="col-md-6"> <div class="form-group"> <label for="projectinput1">Price</label> <input id="itemPrice" type="text" name="recordValue" class="form-control"> </div> </div> </div> </div> </form> </div> </div> <div class="card-footer"> <span class="text-muted">Shopping List Items are Recorded Here</span> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> <button id="addItem" type="button" class="btn btn-primary">Save changes</button> </div> </div> </div> </div> <div class="modal fade" id="shareModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Wish List</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> <div class="card"> <div class="card-header"> <h4 class="card-title">Add New Wish List</h4> </div> <div class="card-body" aria-expanded="true"> <div class="card-block"> <form class="form"> <div class="form-body"> <h4 class="form-section"><i class="ft-user"></i> Item Information </h4> <div class="row"> <div class="col-md-12"> <div class="form-group"> <label for="projectinput1">Share Url</label> <div id="sharespace"></div> <!-- <input id="itemName" type="text" name="recordName" class="form-control"> --> </div> </div> </div> </div> </form> </div> </div> <div class="card-footer"> <span class="text-muted">Shopping List Items are Recorded Here</span> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> <button id="addItem" type="button" class="btn btn-primary">Save changes</button> </div> </div> </div> </div> <!-- Navbar (Header) Starts--> <nav class="navbar navbar-expand-lg navbar-light bg-faded header-navbar"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" data-toggle="collapse" class="navbar-toggle d-lg-none float-left"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><span class="d-lg-none navbar-right navbar-collapse-toggle"><a aria-controls="navbarSupportedContent" href="javascript:;" class="open-navbar-container black"><i class="ft-more-vertical"></i></a></span> <form role="search" class="navbar-form navbar-right mt-1"> <div class="position-relative has-icon-right"> <input type="text" placeholder="Search" class="form-control round" /> <div class="form-control-position"><i class="ft-search"></i></div> </div> </form> </div> </div> </nav> <!-- Navbar (Header) Ends--> <div class="main-panel"> <div class="main-content"> <div class="content-wrapper"> <div class="card"> <div class="card-header"> <h4 class="card-title">WishList</h4> </div> <div class="card-body" aria-expanded="true"> <div class="card-block"> <table id="example" class="table table-striped table-bordered" style="width:100%"> <thead> <tr> <th>Name</th> <th>URL</th> <th>Price</th> <th>Priority</th> <th>Added On</th> <th>Updated On</th> </tr> </thead> <tbody id="itemlist"> </tbody> <tfoot> <tr> <th>Name</th> <th>Position</th> <th>Office</th> <th>Age</th> <th>Start date</th> <th>Salary</th> </tr> </tfoot> </table> <!-- <p class="card-text">Your wish list.</p> <a href="#" class="btn btn-primary">Go somewhere</a> --> </div> </div> <div class="card-footer"> <span class="text-muted">Wish List footer</span> </div> </div> </div> </div> <footer class="footer footer-static footer-light"> <p class="clearfix text-muted text-sm-center px-2"><span>Copyright &copy; 2018 <a href="https://www.connectbench.co" id="pixinventLink" target="_blank" class="text-bold-800 primary darken-2">ConnectBench </a>, All rights reserved. </span></p> </footer> </div>';
        // var dashboardPage = '<div data-active-color="black" data-background-color="white" data-image="" class="app-sidebar"> <div class="sidebar-header"> <div class="logo clearfix"><a href="index.html" class="logo-text float-left"> <div class="logo-img"><img src="app-assets/img/logo-dark.png" /></div><span class="text align-middle">WishList</span> </a><a id="sidebarToggle" href="javascript:;" class="nav-toggle d-none d-sm-none d-md-none d-lg-block"><i data-toggle="expanded" class="ft-toggle-right toggle-icon"></i></a><a id="sidebarClose" href="javascript:;" class="nav-close d-block d-md-block d-lg-none d-xl-none"><i class="ft-x"></i></a></div> </div> <div class="sidebar-content"> <div class="nav-container"> <ul id="main-menu-navigation" data-menu="menu-navigation" class="navigation navigation-main"> <li class=" nav-item"><a href="#dashboard"><i class="ft-home"></i><span data-i18n="" class="menu-title">Dashboard</span></a> </li> <li class="has-sub nav-item"><a href="#dashboard"><i class="fa fa-sticky-note-o"></i><span data-i18n="" class="menu-title">WishList</span><span class="tag badge badge-pill badge-danger float-right mr-1 mt-1">1</span></a> <ul class="menu-content"> <li class="active"><a href="#" data-toggle="modal" data-target="#exampleModal" class="menu-item">Add</a> </li> <li><a href="#dashboard" class="menu-item">Edit</a> </li> <li><a href="#dashboard" data-toggle="modal" data-target="#shareModel" class="menu-item">Share</a> </li> </ul> </li> </ul> </div> </div> <div class="sidebar-background"></div> </div> <!-- Modal --> <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Wish List</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> <div class="card"> <div class="card-header"> <h4 class="card-title">Add New Wish List</h4> </div> <div class="card-body" aria-expanded="true"> <div class="card-block"> <form class="form"> <div class="form-body"> <h4 class="form-section"><i class="ft-user"></i> Item Information </h4> <div class="row"> <div class="col-md-12"> <div class="form-group"> <label for="projectinput1">Item Name</label> <input id="itemName" type="text" name="recordName" class="form-control"> </div> </div> </div> <div class="row"> <div class="col-md-12"> <div class="form-group"> <label for="projectinput1">URL</label> <input id="itemURL" type="text" name="recordName" class="form-control"> </div> </div> </div> <div class="row"> <div class="col-md-6"> <div class="form-group"> <label for="projectinput5">Priority</label> <select id="itemPriority" name="recordType" class="form-control"> <option value="1" disabled="">NONE</option> <option value="2">HIGH</option> <option value="3">MEDIUM</option> <option value="4">LOW</option> </select> </div> </div> <div class="col-md-6"> <div class="form-group"> <label for="projectinput1">Price</label> <input id="itemPrice" type="text" name="recordValue" class="form-control"> </div> </div> </div> </div> </form> </div> </div> <div class="card-footer"> <span class="text-muted">Shopping List Items are Recorded Here</span> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> <button id="addItem" type="button" class="btn btn-primary">Save changes</button> </div> </div> </div> </div> <div class="modal fade" id="shareModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Wish List</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> <div class="card"> <div class="card-header"> <h4 class="card-title">Add New Wish List</h4> </div> <div class="card-body" aria-expanded="true"> <div class="card-block"> <form class="form"> <div class="form-body"> <h4 class="form-section"><i class="ft-user"></i> Item Information </h4> <div class="row"> <div class="col-md-12"> <div class="form-group"> <label for="projectinput1">Share Url</label> <div id="shareURLPlaceholder"></div> <!-- <input id="itemName" type="text" name="recordName" class="form-control"> --> </div> </div> </div> </div> </form> </div> </div> <div class="card-footer"> <span class="text-muted">Shopping List Items are Recorded Here</span> </div> </div> </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div> </div> </div> </div> <!-- Navbar (Header) Starts--> <nav class="navbar navbar-expand-lg navbar-light bg-faded header-navbar"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" data-toggle="collapse" class="navbar-toggle d-lg-none float-left"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><span class="d-lg-none navbar-right navbar-collapse-toggle"><a aria-controls="navbarSupportedContent" href="javascript:;" class="open-navbar-container black"><i class="ft-more-vertical"></i></a></span> <form role="search" class="navbar-form navbar-right mt-1"> <div class="position-relative has-icon-right"> <input type="text" placeholder="Search" class="form-control round" /> <div class="form-control-position"><i class="ft-search"></i></div> </div> </form> </div> </div> </nav> <!-- Navbar (Header) Ends--> <div class="main-panel"> <div class="main-content"> <div class="content-wrapper"> <div class="card"> <div class="card-header"> <h4 class="card-title">WishList</h4> </div> <div class="card-body" aria-expanded="true"> <div class="card-block"> <table id="example" class="table table-striped table-bordered" style="width:100%"> <thead> <tr> <th>Name</th> <th>Description</th> <th>URL</th> <th>Price</th> <th>Priority</th> <th>Added On</th> <th>Updated On</th> <th>Command</th> </tr> </thead> <tbody id="itemlist"> </tbody> <tfoot> <tr> <th>Name</th> <th>Description</th> <th>URL</th> <th>Price</th> <th>Priority</th> <th>Added On</th> <th>Updated On</th> <th>Command</th> </tr> </tfoot> </table> <!-- <p class="card-text">Your wish list.</p> <a href="#" class="btn btn-primary">Go somewhere</a> --> </div> </div> <div class="card-footer"> <span class="text-muted">Wish List footer</span> </div> </div> </div> </div> <footer class="footer footer-static footer-light"> <p class="clearfix text-muted text-sm-center px-2"><span>Copyright &copy; 2018 <a href="https://www.connectbench.co" id="pixinventLink" target="_blank" class="text-bold-800 primary darken-2">ConnectBench </a>, All rights reserved. </span></p> </footer> </div>';
        var dashboardPage = '<div data-active-color="black" data-background-color="white" data-image="" class="app-sidebar"> <div class="sidebar-header"> <div class="logo clearfix"><a href="index.html" class="logo-text float-left"> <div class="logo-img"><img src="app-assets/img/logo-dark.png" /></div><span class="text align-middle">WishList</span> </a><a id="sidebarToggle" href="javascript:;" class="nav-toggle d-none d-sm-none d-md-none d-lg-block"><i data-toggle="expanded" class="ft-toggle-right toggle-icon"></i></a><a id="sidebarClose" href="javascript:;" class="nav-close d-block d-md-block d-lg-none d-xl-none"><i class="ft-x"></i></a></div> </div> <div class="sidebar-background"></div> </div> <!-- Navbar (Header) Starts--> <nav class="navbar navbar-expand-lg navbar-light bg-faded header-navbar"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" data-toggle="collapse" class="navbar-toggle d-lg-none float-left"><span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button><span class="d-lg-none navbar-right navbar-collapse-toggle"><a aria-controls="navbarSupportedContent" href="javascript:;" class="open-navbar-container black"><i class="ft-more-vertical"></i></a></span> <form role="search" class="navbar-form navbar-right mt-1"> <div class="position-relative has-icon-right"> <input type="text" placeholder="Search" class="form-control round" /> <div class="form-control-position"><i class="ft-search"></i></div> </div> </form> </div> <button><a href="#logout">Logout</a></button> </div> </nav> <!-- Navbar (Header) Ends--> <div stype="margin-top: 5rem" class="main-panel"> <div class="main-content"> <div class="content-wrapper"> <table class="table"> <thead> <tr> <th>name</th> <th>url</th> <th>price</th> <th>user ID</th> <th>priority</th> <th>delivery Date</th> <th>Action</th> </tr> <tr> <td><input class="form-control name-input"></td> <td><input class="form-control url-input"></td> <td><input class="form-control price-input"></td> <td><input class="form-control userID-input"></td> <td><input class="form-control priority-input"></td> <td><input class="form-control delivery_date-input"></td> <td><button class="btn btn-primary add-blog">Add</button></td> </tr> </thead> <tbody class="blogs-list"></tbody> </table> </div> </div> </div>';
        $("#dashboard").html(dashboardPage);
        // $('#itemName').val("Hi");
    },
    logoutPage: function(){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('userLevel');
        appRouter.navigate('login', {trigger: true});
        return;
    },
    sharePage: function(id){
        var sharePage = '<div class="main-content"> <div class="content-wrapper"> <div class="card"> <div class="card-header"> <h4 class="card-title">WishList</h4> </div> <div class="card-body" aria-expanded="true"> <div class="card-block"> <table id="example" class="table table-striped table-bordered" style="width:100%"> <thead> <tr> <th>Name</th> <th>Description</th> <th>URL</th> <th>Price</th> <th>Priority</th> <th>Added On</th> <th>Updated On</th> </tr> </thead> <tbody id="externallist"> </tbody> <tfoot> <tr> <th>Name</th> <th>Description</th> <th>URL</th> <th>Price</th> <th>Priority</th> <th>Added On</th> <th>Updated On</th> </tr> </tfoot> </table> </div> </div> <div class="card-footer"> <span class="text-muted">Wish List footer</span> </div> </div> </div> <footer class="footer footer-static footer-light"> <p class="clearfix text-muted text-sm-center"><span>Copyright &copy; 2018 <a href="https://www.connectbench.co" id="pixinventLink" target="_blank" class="text-bold-800 primary darken-2">ConnectBench </a>, All rights reserved. </span></p> </footer>';
        $("#login").html(sharePage);
        new app.wishlist({url: "http://localhost/wishlist-backend/api/external/"+id}).fetch({
            success: (result) => {
                console.log(result.toJSON().data.itemLists);
                collection = new app.itemCollection(result.toJSON().data.itemLists.wishListItems);
                var itemView = new app.collectionItemView({ collection: collection });
                $('#externallist').html(itemView.render().el);
                $(".removeMe").unwrap()
                $('#example').DataTable();
            }
        })
    }
});