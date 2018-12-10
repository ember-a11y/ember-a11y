'use strict';

var writeFile = require('broccoli-file-creator');
var mergeTrees = require('broccoli-merge-trees');
var VersionChecker = require('ember-cli-version-checker');
var stew = require('broccoli-stew');

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

    if (!this.isGlimmer && !this.isHTMLBars) {
      throw new Error('ember-a11y does not support your version of Ember.');
    }
  },

  treeForAddon: function(_tree) {
    var trees = [_tree];

    // Overwrite the unnecessary `ember-internals` module.
    if (this.isGlimmer) {
      trees.push(writeFile('utils/ember-internals.js', 'export function registerKeywords() {}'));
    }

    var mergedTrees = mergeTrees(trees.filter(Boolean), { overwrite: true });

    return this._super.treeForAddon.call(this, mergedTrees);
  },

  treeForAddonTemplates: function(_tree) {
    // Include only the correct component.
    var remove, rename;
    if (this.isGlimmer) {
      rename = stew.rename(_tree, 'glimmer-', '');
      remove = stew.rm(rename, '*/htmlbars-*');
    } else {
      rename = stew.rename(_tree, 'htmlbars-', '');
      remove = stew.rm(rename, '*/glimmer-*');
    }

    return this._super.treeForTemplates.call(this, remove);
  },
};
