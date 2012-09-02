window.app.Views.DatabaseView = Backbone.View.extend({
  initialize: function (options) {
    this.db_name = options.db_name;

  },

  render: function () {
    var self = this;
    var promise = $.getJSON('/' + this.db_name + '/_all_docs',{limit:50});

    promise.done(function (items) {
      self.docs = items.rows;

      self.$el.html(ich.DatabaseTemplate({docs: self.docs, name: self.db_name}));
    });

    return this;
  },


});
