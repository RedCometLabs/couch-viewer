window.app.Views.BreadcrumbView = Backbone.View.extend({
  initialize: function (options) {
    this.router = options.router;
    _.bindAll(this);

    this.router.on('route:home', this.home_crumbs);
    this.router.on('route:view_db', this.db_crumbs);
    this.router.on('route:view_doc', this.doc_crumbs);
    this.router.on('route:view_db_view', this.db_view_crumbs);
    

  },

  home_crumbs: function () {
    this.crumbs = [this.create_dbs_crumb(true)];
    this.render();
    
  },

  db_crumbs: function (name) {
    this.crumbs = [this.create_dbs_crumb(false), this.create_db_crumb(name, true) ];
    this.render();

  },

  doc_crumbs: function (name, doc) {
    this.crumbs = [this.create_dbs_crumb(false),  this.create_db_crumb(name, false), this.create_doc_crumb(name, doc, true) ];
    this.render();
  },

  db_view_crumbs: function (name, ddoc, view) {
    this.crumbs = [this.create_dbs_crumb(false),  this.create_db_crumb(name, false), {active: true, title: view}]
    this.render();

  },

  render: function () {
    this.$el.html(ich.BreadcrumbTemplate({crumbs: this.crumbs}));

  },

  create_dbs_crumb: function (active) {
    return {url:'/', title: 'Databases', active: active}
  },

  create_db_crumb: function (name, active) {
    return {url:'/db/' + name, title: name, active: active}
  },

  create_doc_crumb: function (name, doc, active) {
    return {url:'/db/' + name +'/'+doc, title: doc, active: active}
  }






});
