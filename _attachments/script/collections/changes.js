app.Collections.Changes = Backbone.Collection.extend({
  
  model: app.Models.Change,

  initialize: function (options) {
    this.db_name = options.db_name;

  },

  fetch: function () {
    var self = this;
    var promise = $.getJSON('/' + this.db_name + '/_changes', {limit:200, style:'all_docs'});

    promise.done(function (response) {
      console.log(response);
      self.last_seq = response.last_seq;
      var changes = _.map(response.results, function (result) {
        return {
          id: result.id,
          seq: result.seq,
          changes: JSON.stringify(result.changes)
        };

      });

      self.reset( changes);
    });
  }

});
