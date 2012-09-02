window.app.Views.DatabaseView = Backbone.View.extend({
  initialize: function (options) {
    _.bindAll(this);
    this.db_name = options.db_name;

    if (!this.collection) {
      this.collection = new app.Collections.Databases({db_name: this.db_name});
    }

    this.collection.on('reset', this.collection_updated);
    this.collection.fetch();
  },

  collection_updated: function (items) {
    this.render();
  },

  render: function () {
    this.$el.html(ich.DatabaseTemplate({docs: this.collection.toJSON(), name: this.db_name}));
    this.db_views = new app.Views.DbViewsListerView({el: this.$el.find("#view-list"), db_name: this.db_name});

    return this;
  },


});
