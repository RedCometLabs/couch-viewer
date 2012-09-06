app.Views.DbViews = Backbone.View.extend({

  initialize: function (options) {
    _.bindAll(this);

    this.router = options.router;
    this.db_name = options.db_name;
    this.ddoc = options.ddoc;
    this.view = options.view;

    if(!this.collection) {
      this.collection = new app.Collections.Documents({db_name: this.db_name});
    }
  },

  events: {
   "submit #view-query-form": "query_view"
  },

  query_view: function (event) {
    var self = this,
        params = {
          reduce: false
        };

    event.preventDefault();

    this.$('input[data-query-type="text"]').each(function (index, item) {
      var value = $(this).val(),
          id = $(this).attr('id');

      if (!value) { return }

      if (value[0] == '"' || value[0] == '[' || value[0] == '{') {
        params[id] = value;
      } else {
        params[id] = JSON.stringify(value);
      }

    });

    this.$('input[data-query-type="number"]').each(function (index, item) {
      var value = $(this).val(),
          id = $(this).attr('id')

      if (!value) { return }

      params[id] = value;
    });

    this.$('input:checked').each(function (index, item) {
      var id = $(this).attr('id');
      params[id] = true;
    });

    //this.router.navigate(Backbone.history.fragment + '?' + $.param(params));
    this.collection.fetch_from_view(this.ddoc, this.view, params);
  },

  render: function () {
    this.$el.html(ich.ViewTemplate());
    this.db_views = new app.Views.DbViewsListerView({el: this.$el.find("#view-list"), db_name: this.db_name});

    if (!this.view_results) {
      this.view_results = new app.Views.ViewResults({db_name: this.db_name, el: this.$el.find('#view-results'), collection: this.collection});
      this.query_view({preventDefault: function(){}});
    }

    return this;
  }

});

