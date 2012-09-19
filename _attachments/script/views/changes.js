 app.Views.ChangesView = Backbone.View.extend({

   initialize: function (options) {
    _.bindAll(this);
    this.db_name = options.db_name;

    if(!this.collection) {
      this.collection = new app.Collections.Changes({db_name: this.db_name});
    }

    this.collection.on("reset", this.render);
    this.collection.on("add", this.render);

    this.collection.fetch();

   },

   render: function () {
    this.$el.html(ich.ChangesTemplate({db_name: this.db_name, changes: this.collection.toJSON()}));

    return this;
   }

 });
