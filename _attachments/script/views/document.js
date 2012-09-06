window.app.Views.DocumentView = Backbone.View.extend({

  initialize: function (options) {
    this.document_id = options.document_id;
    this.db_name = options.db_name;
    this.router = options.router;

  },

  events: {
   "click #save-doc":"save_doc",
   "click #delete-doc": "delete_doc"

  },

  delete_doc: function (event) {
    var doc = this.editor.get(),
        self = this;

    event.preventDefault();
    var result = confirm("Are you sure you want to delete this document?");

    if (!result) { return};

    var promise = $.ajax({
      url: '/'+ this.db_name + '/' + doc._id +'?rev='+ doc._rev.toString(),
      type: 'DELETE'
    });

    promise.done(function () {
      self.router.navigate('db/' + self.db_name, {trigger: true});

    });


  },

  save_doc: function (event) {
    var doc = this.editor.get(),
        self = this;

    event.preventDefault();

    var promise = $.ajax({
      url: '/'+ this.db_name + '/' + doc._id,
      type: 'PUT',
      data: JSON.stringify(doc),
    });

    promise.done(function (response) {
      doc._rev = JSON.parse(response).rev;
      self.editor.set(doc);

    });

  },

  render: function () {
    var self = this,
          json_container;

    this.$el.html(ich.DocumentTemplate());
    json_container = this.$el.find("#editor")[0];
    this.editor = new JSONEditor(json_container);

    var promise = $.getJSON('/' + this.db_name + "/" + this.document_id);

    promise.done(function (doc) {
      self.editor.set(doc);

    });
  
    return this;
  }

});
