app.Views.ViewResults = Backbone.View.extend({

  initialize: function (options) {
    this.results = options.results || [];
    
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
    this.$el.html(ich.ViewResultsTemplate({results: this.results}));

  },

  render_with_results: function (results) {
    this.results = _.map(results.rows, function (item) {
      return {id: item.id, key: JSON.stringify(item.key), value: JSON.stringify(item.value), doc: JSON.stringify(item.doc)}
    });

    this.render();
   
  }

});

