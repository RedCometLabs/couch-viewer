window.app.Collections.Databases = Backbone.Collection.extend({
  model: app.Models.Database,

  initialize: function (options) {
    this.db_name = options.db_name;
  },

  fetch: function () {
    var self = this,
        promise = $.getJSON('/' + this.db_name + '/_all_docs',{limit:50});

    promise.done(function (items) {
      self.reset(items.rows);
    });
  }

});
