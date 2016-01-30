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

    simplemocha: {
      all: { src: ['test/lib/*.js'] }
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
        repo: 'grunt-gh-releaser'
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
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.registerTask('test', ['simplemocha']);
  grunt.registerTask('release', ['gh_release']);
  grunt.registerTask('default', ['jshint', 'test']);
};
