window.app.Views.DatabasesViewer = Backbone.View.extend({
  initialize: function (options) {

  },

  render: function () {
    var self = this;
    var promise = $.getJSON('/_all_dbs');

    promise.done(function (dbs) {
      var queue = jQuery.Deferred();
      queue.resolve();

      self.databases = [];

      $.each(dbs, function (index, item) {
       queue = queue.pipe(function () {
           return $.getJSON('/'+item, function (db_data) {
            self.databases.push({
              name: item, 
              num: index + 1,
              size: db_data.disk_size,
              num_docs: db_data.doc_count,
              update_seq: db_data.update_seq
            });
          });
        });
      });

      queue.always(function (){
        self.databases = _.sortBy(self.databases, function(db){ return db.num; });
        self.$el.html(ich.IndexTemplate({databases: self.databases}));
      });
    })

    
    return this;
  },


});
