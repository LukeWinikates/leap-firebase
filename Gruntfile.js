module.exports = function(grunt) {
  grunt.initConfig({
    neuter: {
      options: {
        includeSourceURL: true
      },
      'app/build/application.js': 'app/client/js/app.js'
    },
    emberTemplates: {
      options: {
        templateName: function(sourceFile) {
          return sourceFile.replace(/app\/client\/templates\//, '');
        }
      },
      'app/build/templates.js': ["app/client/templates/**/*.hbs"]
    }
  });
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-neuter');

  grunt.registerTask('default', ['emberTemplates', 'neuter']);
};
