var couchapp = require('couchapp'), 
    path = require('path'),
    ddoc;

ddoc = {
  _id: '_design/yowzer',
  rewrites: {},
  views: {},
  shows: {},
  lists: {},
  validate_doc_update: function(newDoc, oldDoc, userCtx) {
    /*if (newDoc._deleted === true && userCtx.roles.indexOf('_admin') === -1) {
      throw "Only admin can delete documents on this database.";
    }*/
  }
};


couchapp.loadAttachments(ddoc, path.join(__dirname, '_attachments'));
module.exports = ddoc;
