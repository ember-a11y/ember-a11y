/* jshint node:true */
'use strict';

module.exports = {
  extends: 'recommended',
  rules: {
    'img-alt-attributes': true,
    'invalid-interactive': false, // false until fix of https://github.com/rwjblue/ember-template-lint/issues/80
    'nested-interactive': true
  }
};
