/*
 * grunt-gh-release
 * https://github.com/djtek/grunt-gh-release
 *
 * Copyright (c) 2016 Luciano P. Altube
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    nodeunit: {
      all: ['test/*_test.js'],
      options: {
        reporter: 'junit',
        reporterOptions: {
          output: 'outputdir'
        }
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Configuration to be run (and then tested).
    gh_release: {
      options: {
        auth: {
          type: 'basic',
          username: process.env.GH_USERNAME,
          password: process.env.GH_PASSWORD
        },
        owner: process.env.GH_OWNER,
        repo: 'grunt-gh-release'
      },
      release: {
        tag_name: "v<%= pkg.version %>",
        name: "v<%= pkg.version %>",
        src: ['LICENSE', 'README.md']
      }
    },
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', ['nodeunit']);
  grunt.registerTask('default', ['jshint', 'test']);
};
