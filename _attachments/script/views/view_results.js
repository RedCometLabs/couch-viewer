app.Views.ViewResults = Backbone.View.extend({

  initialize: function (options) {
    _.bindAll(this);
    this.results = options.results || [];
    this.db_name = options.db_name;
    
    this.collection.on('reset', this.render);    
  },

  events: {
    "click .expand-doc": "show_doc",
    "click .hide-doc": "hide_doc",
  },

  show_doc: function (event) {
    var $this = this.$(event.currentTarget);
    event.preventDefault();
    $this.parent().next().show();
    $this.removeClass('expand-doc').addClass('hide-doc').find('i').removeClass('icon-chevron-up').addClass('icon-chevron-down');

  },

  hide_doc: function (event) {
    var $this = this.$(event.currentTarget);
    event.preventDefault();
    $this.parent().next().hide();
    $this.removeClass('hide-doc').addClass('expand-doc').find('i').removeClass('icon-chevron-down').addClass('icon-chevron-up');

  },


  render: function () {
    this.$el.html(ich.ViewResultsTemplate({db_name: this.db_name, results: this.collection.toJSON()}));
  },

});

