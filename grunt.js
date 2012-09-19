/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    watch: {
             //files: '<config:lint.files>',
             //tasks: 'lint test'
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');

  // Default task.
  grunt.registerTask('default', 'less');

};
