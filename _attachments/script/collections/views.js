app.Collections.Views = Backbone.Collection.extend({
  model: app.Models.View,

  initialize: function (options) {
    this.db_name = options.db_name;

  },

  fetch: function () {
    var self = this;
    var promise = $.getJSON('/' + this.db_name + '/_all_docs', {startkey:'"_design/"', endkey: '"_design0"', include_docs: true});

    promise.done(function (response) {
      console.log("fetch");
      var views = _.map(response.rows, function (item) { return item.doc });
      var view_names = _.map(views, function (view) { 
        return {
          name: view._id.split("_design/")[1],
          views: _.map(Object.keys(view.views), function (item) { return {view: item, ddoc: view._id.split("_design/")[1]}})
        }});

      self.reset(view_names);
    });
  }
});
