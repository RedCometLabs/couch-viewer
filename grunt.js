/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-couchapp');

  couch_config = {
    yowzer: {
              db: 'http://localhost:5984/yowzer',
              app: './app.js',
              options: {
                okay_if_missing: true
              }
            }
  }

  // Project configuration.
  grunt.initConfig({
    watch: {
             //files: '<config:lint.files>',
             //tasks: 'lint test'
             files: ['*.html', '*.less', '*.js'],
             tasks: 'less yowzer'
           },

    less: {
            development: {
                         options: {
                                    // paths: ["assets/css"]
                                  },

                         files: {
                          "_attachments/style/bootstrap.css": "_attachments/style/less/bootstrap.less"
                          }
                      },
          },

    mkcouchdb: couch_config,
    rmcouchdb: couch_config,
    couchapp: couch_config
  });


  grunt.registerTask('yowzer', 'rmcouchdb:yowzer mkcouchdb:yowzer couchapp:yowzer');
  grunt.registerTask('default', 'less yowzer');

};
