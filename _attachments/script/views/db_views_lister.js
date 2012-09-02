window.app.Views.DbViewsListerView = Backbone.View.extend({

  initialize: function (options) {
    _.bindAll(this);

    this.db_name = options.db_name;

    if(!this.collection) {
      this.collection = new app.Collections.Views({db_name: this.db_name});
    }

    this.collection.on("reset", this.collection_updated);
    this.collection.fetch();

  },

  collection_updated: function (event) {
    this.render();
  },

  render: function () {
    this.$el.html(ich.ViewListTemplate({db_name:this.db_name, view_names: this.collection.toJSON()}));
    return this;
  }

});
