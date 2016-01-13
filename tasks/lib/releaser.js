var grunt = require('grunt');
var Github = require('github');

var Releaser = function (options) {
  this.options = options;

  this.client = new Github({
    version: "3.0.0"
  });
};

Releaser.prototype.authenticatedCall = function (apiCall, msg, cb) {
  this.client.authenticate(this.options.auth);

  msg = grunt.util._.merge({
    owner: this.options.owner,
    repo: this.options.repo
  }, msg);

  this.client.authenticate(this.options.auth);
  apiCall(msg, cb);
};

Releaser.prototype.createRelease = function (msg, cb) {
  this.authenticatedCall(this.client.releases.createRelease, msg, cb);
};

Releaser.prototype.uploadAsset = function (msg, cb) {
  this.authenticatedCall(this.client.releases.uploadAsset, msg, cb);
};

module.exports = Releaser;

