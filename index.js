/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var replace = require('broccoli-string-replace');
var mergeTrees = require('broccoli-merge-trees');
var VersionChecker = require('ember-cli-version-checker');

// Support old versions of Ember CLI.
function findHost() {
  var current = this;
  var app;

  // Keep iterating upward until we don't have a grandparent.
  // Has to do this grandparent check because at some point we hit the project.
  // Stop at lazy engine boundaries.
  do {
    if (current.lazyLoading === true) { return current; }
    app = current.app || app;
  } while (current.parent && current.parent.parent && (current = current.parent));

  return app;
}

module.exports = {
  name: 'ember-a11y',

  init: function() {
    if (this._super.init) {
      this._super.init.apply(this, arguments);
    }

    var versionChecker = new VersionChecker(this);
    versionChecker.for('ember-cli', 'npm').assertAbove('0.2.0');

    var emberNpmVersion = versionChecker.for('ember-source', 'npm');

    // if `ember-source` is installed, assume Glimmer
    if (emberNpmVersion.version) {
      this.isGlimmer = true;
      this.isHTMLBars = false;
      this.versionSpecificPath = path.join(this.root, 'glimmer-version');
    } else {
      var emberVersion = versionChecker.for('ember', 'bower');

      var isGlimmer = (emberVersion.gt('2.9.0-beta') && emberVersion.lt('2.9.0')) || emberVersion.gt('2.10.0-alpha');
      var isHTMLBars = emberVersion.gt('1.10.0-beta') && !isGlimmer;

      if (isGlimmer) {
        this.versionSpecificPath = path.join(this.root, 'glimmer-version');
        this.isGlimmer = isGlimmer;

      } else if (isHTMLBars) {
        this.isHTMLBars = isHTMLBars;
        this.versionSpecificPath = path.join(this.root, 'htmlbars-version');
      } else {
        throw new Error();
      }
    }
  },

  included: function(app) {
    this.app = findHost.call(this);

    // blacklist `ember-getowner-polyfill` since it is supported
    // by default in Glimmer
    if (this.isGlimmer) {
      var blacklist = this.app.options.addons.blacklist;

      if (blacklist) {
        blacklist.push('ember-getowner-polyfill');
      } else {
        blacklist = ['ember-getowner-polyfill'];
      }
    }
  },

  treeForAddon: function() {
    var trees = [this._super.treeForAddon.apply(this, arguments)];

    // include `ember-internals` module ONLY for htmlbars
    if (this.isHTMLBars) {
      trees.push(new Funnel(this.versionSpecificPath, {
        files: ['ember-internals.js'],
        destDir: 'modules/' + this.name
      }));
    }

    return mergeTrees(trees, { overwrite: true });
  },

  treeForTemplates: function() {
    var trees = [this._super.treeForTemplates.apply(this, arguments)];

    trees.push(this.treeGenerator(
      path.resolve(this.root, this.versionSpecificPath, 'app', 'templates')
    ));

    return mergeTrees(trees.filter(Boolean), { overwrite: true });
  },

  treeForApp: function(defaultTree) {
    this._super.treeForApp.call(this, arguments);

    if (this.isGlimmer) {
      // since `ember-internals` module is not needed for Glimmer
      // we want to remove calls to it from instance initializer.
      // string-replace hack, replace everything that is wrapped
      // into "{{htmlbars}}" with an empty string.
      var PATTERN = /\/\/{{htmlbars}}[\s\S]*?\/\/{{\/htmlbars}}/gim;
      defaultTree = replace(defaultTree, {
        files: ['instance-initializers/ember-a11y.js'],
        pattern: {
          match: PATTERN,
          replacement: ''
        }
      });
    }

    var trees = [defaultTree];

    trees.push(this.treeGenerator(
      path.resolve(this.root, this.versionSpecificPath, 'app')
    ));

    return mergeTrees(trees, { overwrite: true });
  }
};
