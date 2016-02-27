// This initializer exists only to make sure that the following
// imports happen before the app boots.
import { registerKeywords } from 'ember-a11y/ember-internals';
registerKeywords();

import Ember from 'ember';

export function initialize(application) {
  let startRouting = application.startRouting;
  application.startRouting = function() {
    console.log('here');
    startRouting.call(application);
  }
}

export default {
  name: 'ember-a11y',
  initialize
};
