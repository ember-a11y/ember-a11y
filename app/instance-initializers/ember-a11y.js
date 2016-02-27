// This initializer exists only to make sure that the following
// imports happen before the app boots.
import Ember from 'ember';
import { registerKeywords } from 'ember-a11y/ember-internals';
registerKeywords();

let handlerInfos;
Ember.Router.reopen({
  didTransition(handlerInfos) {
    this._super(...arguments);
  }
});

export function initialize(application) {}

export default {
  name: 'ember-a11y',
  initialize
};
