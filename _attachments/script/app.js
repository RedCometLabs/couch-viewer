window.app = {
  Models: {},
  Collections: {},
  Views: {},
  Mixins: {},
  Routers: {},
  init: function () {
    this.Routers.app_router = new this.Routers.AppRouter();
    this.Views.breadcrumb_view = new this.Views.BreadcrumbView({el:$("#breadcrumbs"), router: this.Routers.app_router});
    this.Views.breadcrumb_view.render();
    Backbone.history.start();
  }
}
