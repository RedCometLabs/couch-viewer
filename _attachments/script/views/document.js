window.app.Views.DocumentView = Backbone.View.extend({

  initialize: function (options) {
    this.document_id = options.document_id;
    this.db_name = options.db_name;

  },

  render: function () {
    var self = this,
          json_container;

    this.$el.html(ich.DocumentTemplate());
    json_container = this.$el.find("#editor")[0];
    this.editor = new JSONEditor(json_container);

    var promise = $.getJSON('/' + this.db_name + "/" + this.document_id);

    promise.done(function (doc) {
      console.log(doc);
      self.editor.set(doc);

    });
  
  /*if (err) {
    if (err.status == 404) {
      _doc = {
        _id: docid
      };
    }
  }*/



    return this;
  }

});
