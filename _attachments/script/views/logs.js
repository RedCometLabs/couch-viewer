app.Views.LogsView = Backbone.View.extend({
  events: {
    
  },

  initialize: function (options) {
  },

  render: function () {
    var self = this;
    console.log("render");
    var promise = $.get('/_log', {bytes:5000});
    
    promise.done(function (data) {
      var logs = [],
          lines =  data.split(/\n/);

      _.each(lines, function (log) {
        raw_items = log.split("]");

          if (raw_items.length < 4) { return; }

           var log_row = {
               date: raw_items[0].replace("["," "),
                   log_level: raw_items[1].replace("["," "),
                   pid: raw_items[2].replace("["," "),
                   args: raw_items[3].replace("["," "),
                 };
           logs.push(log_row);
        })

      self.$el.html(ich.LogsTemplate({logs: logs}));
    });
    
   return this;
  }

});

