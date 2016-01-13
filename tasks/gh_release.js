/*
 * grunt-gh-release
 * https://github.com/djtek/grunt-gh-release
 *
 * Copyright (c) 2016 Luciano P. Altube
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var async = require('async');
var Releaser = require('./lib/releaser');

module.exports = function(grunt) {
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('gh_release', 'Creates github releases.', function() {

    // Merge task-specific and/or target-specific options with these defaults.
    // var options = this.options({ ... });
    var self = this;
    var options = this.options();
    var data = this.data;
    var releaser = new Releaser(options);
    var done = this.async();

    releaser.createRelease(data, function (err, release) {
      if (err) {
        return grunt.log.error(err);
      }

      var assets = [];

      self.files.forEach(function (f) {
        var found = f.src.filter(function (filepath) {
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          }

          grunt.log.warn('Source file "' + filepath + '" found.');
          return true;
        });

        assets = assets.concat(found);
      });

      // Iterate over all specified file groups.
      // And add asset to release.
      async.map(assets, function(asset, callback) {
        grunt.log.writeln('About to upload asset:', asset);

        releaser.uploadAsset({
          id: release.id,
          name: path.basename(asset),
          filePath: asset
        }, function (err, result) {
          if (!err) {
            grunt.log.ok('Asset upload successful:', result.name);
          }

          callback(err, result);
        });
      }, function(err, results) {
        if (err) {
          return done(err);
        }

        grunt.log.ok('Release created successfully!');
        done();
      });
    });
  });
};
