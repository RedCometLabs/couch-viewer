app.Views.DbViews = Backbone.View.extend({

  initialize: function (options) {
    this.db_name = options.db_name;
    this.ddoc = options.ddoc;
    this.view = options.view;

  },

  render: function () {
    this.$el.html(ich.ViewTemplate());

    return this;
  }

});

//view_url ='/'+ encodeURIComponent(db) + '/_design/' + ddoc + '/_view/' + view + "?reduce=false&" + q_values.join('&');
