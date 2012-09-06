window.app.Collections.Documents = Backbone.Collection.extend({
  model: app.Models.Document,

  initialize: function (options) {
    this.db_name = options.db_name;
  },

  fetch: function () {
    var self = this,
        promise = $.getJSON('/' + this.db_name + '/_all_docs',{limit:50});

    promise.done(function (items) {
      self.reset(items.rows);
    });
  },

  fetch_from_view: function (ddoc, view, params) {
    var self = this,
        promise = $.getJSON('/' + this.db_name + '/_design/' + ddoc + '/_view/' + view, params);

    promise.done(function (items) {
       var results = _.map(items.rows, function (row) {
          return {
                  id: row.id, 
                  key: JSON.stringify(row.key), 
                  value: JSON.stringify(row.value), 
                  doc: JSON.stringify(row.doc)
          }
        });

        self.reset(results);
    });

  }

});
