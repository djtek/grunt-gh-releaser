# grunt-gh-release

> Grunt plugin to create Github releases.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-gh-releaser --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-gh-releaser');
```

## The "gh_release" task

### Overview
In your project's Gruntfile, add a section named `gh_release` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  gh_release: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.auth
Type: `Object`

An object that contains infomation about github authentication info.

You can read all the available options here:
http://mikedeboer.github.io/node-github/#Client.prototype.authenticate

#### options.owner
Type: `String`

A string that represents the name of the owner.

#### options.repo
Type: `String`

A string that represents the name of the repository.

### Target

#### target.release
Type: `Object`

An object that describes the release for the project. You can supply any valid paramemters accepted by the Github api (v3.0.0).

In addition to the relase info, you can attach assets by providing files in any of the `file mappings` supported by `Grunt`.

More info here: https://developer.github.com/v3/repos/releases/#create-a-release

### Usage Examples

```js
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  gh_release: {
    options: {
      auth: {
        type: 'basic',
        username: process.env.GH_USERNAME,
        password: process.env.GH_PASSWORD
      },
      owner: process.env.GH_OWNER,
      repo: 'awesome-repo'
    },
    release: {
      tag_name: "v<%= pkg.version %>",
      name: "v<%= pkg.version %>",
      src: ['dist/**/*']
    }
  },
});
```

## Release History
_(Nothing yet)_
