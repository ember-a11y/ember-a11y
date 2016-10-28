/* jshint node: true */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel');
var replace = require('broccoli-string-replace');
var mergeTrees = require('broccoli-merge-trees');
var VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-a11y',

  init: function() {
    if (this._super.init) {
      this._super.init.apply(this, arguments);
    }

    // Identify if we're building for HTMLBars or Glimmer.
    var versionChecker = new VersionChecker(this);
    versionChecker.for('ember-cli', 'npm').assertAbove('0.2.0');

    var emberBowerChecker = versionChecker.for('ember', 'bower');
    var emberSourceVersion = versionChecker.for('ember-source', 'npm').version;

    /**
     * There are many weird interim versions of Glimmer in use.
     *
     * We check for versions known to be released with Glimmer:
     * - 2.9.0-alpha.[1-4]
     * - 2.9.0-beta.[1-5]
     * - 2.10.0-alpha.1
     * - All versions released as ember-source.
     */
    this.isGlimmer = emberSourceVersion || (emberBowerChecker.gt('2.9.0-alpha') && emberBowerChecker.lt('2.9.0')) || emberBowerChecker.gt('2.10.0-alpha');
    this.isHTMLBars = !this.isGlimmer && emberBowerChecker.gt('1.10.0-beta');

    if (this.isGlimmer) {
      this.versionSpecificPath = path.join(this.root, 'glimmer-version');
    } else if (this.isHTMLBars) {
      this.versionSpecificPath = path.join(this.root, 'htmlbars-version');
    } else {
      throw new Error('ember-a11y does not support your version of Ember.');
    }
  },

  shouldIncludeChildAddon: function(addon) {
    if (addon.name !== 'ember-getowner-polyfill') {
      return this._super.shouldIncludeChildAddon.apply(this, arguments);
    }

    return this.isHTMLBars;
  },

  treeForAddon: function() {
    var tree = mergeTrees([this._super.treeForAddon.apply(this, arguments)], { overwrite: true });
    var trees = [tree];

    // include `ember-internals` module ONLY for htmlbars
    if (this.isHTMLBars) {
      trees.push(new Funnel(this.versionSpecificPath, {
        files: ['ember-internals.js'],
        destDir: 'modules/' + this.name
      }));
    }

    trees.push(new Funnel(this.versionSpecificPath, {
      files: ['ember-get-owner.js'],
      destDir: 'modules/' + this.name
    }));

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

    var PATTERN = /{{htmlbars}}[\s\S]*?{{\/htmlbars}}/gim;

    if (this.isGlimmer) {
      // since `ember-internals` module is not needed for Glimmer
      // we want to remove calls to it from instance initializer.
      // string-replace hack, replace everything that is wrapped
      // into "{{htmlbars}}" with an empty string.
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
