app.Views.DbViews = Backbone.View.extend({

  initialize: function (options) {
    _.bindAll(this);

    this.db_name = options.db_name;
    this.ddoc = options.ddoc;
    this.view = options.view;

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

    this.$('.vinput').each(function (index, item) {
      var value = $(this).val(),
          id = $(this).attr('id');

      if (value) {
        params[id] = value;
      }

    });

    this.$('input:checked').each(function (index, item) {
      var id = $(this).attr('id');
      params[id] = true;
    });
    console.log(params);
  
    var promise = $.getJSON('/' + this.db_name + '/_design/' + this.ddoc + '/_view/' + this.view, params);
    promise.done(function (items) {
      console.log(items);
      self.view_results.render_with_results(items);
    });
  },

  render: function () {
    this.$el.html(ich.ViewTemplate());

    if (!this.view_results) {
      this.view_results = new app.Views.ViewResults({el: this.$el.find('#view-results')});
      this.query_view({preventDefault: function(){}});
    }

    return this;
  }

});

//view_url ='/'+ encodeURIComponent(db) + '/_design/' + ddoc + '/_view/' + view + "?reduce=false&" + q_values.join('&');
