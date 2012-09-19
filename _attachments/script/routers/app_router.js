app.Routers.AppRouter = Backbone.Router.extend({

  routes: {
    "db/:name": "view_db",
    "db/:name/:ddoc/:id": "view_db_view",
    "db/:name/_changes": "view_changes",
    "db/:name/*id": "view_doc",
    "logs": "view_logs", 
    "status": "view_status",
    "*page": "home"
  },

  home: function () {
    this.clean_up();

    app.Views.databasesView = new app.Views.DatabasesViewer({});
    app.current_view = app.Views.databasesView;
    this.append_to_content();
  },

  view_logs: function () {
    this.clean_up();
    app.current_view = new app.Views.LogsView();
    this.append_to_content();
  },

  view_doc: function (name, id) {
    this.clean_up();
    app.current_view = new app.Views.DocumentView({router: this, db_name: name, document_id: id});
    app.current_view.render();
    this.append_to_content();
  },

  view_changes: function(name) {
   this.clean_up();
   app.current_view = new app.Views.ChangesView({db_name: name});
   app.current_view.render();
   this.append_to_content();
  },

  view_db: function(name) {
    this.clean_up();

    app.current_view = new app.Views.DatabaseView({db_name: name});
    app.current_view.render();
    this.append_to_content();

  },

  view_db_view: function (name, ddoc, view) {
    this.clean_up();
    app.current_view = new app.Views.DbViews({router: this, db_name: name,ddoc: ddoc, view: view});
    this.append_to_content();
  },

  clean_up: function() {
    if(!app.current_view) { return };

    app.current_view.remove();
  },

  append_to_content: function () {
    $("#content").html(app.current_view.render().el);
  }

});

