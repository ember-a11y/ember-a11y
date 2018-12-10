import Ember from 'ember';
import pivotRouteIdentifier from 'ember-a11y/utils/pivot-route-identifier';

// This is to enable HTMLBars support. In Glimmer it is replaced with an empty funciton.
import { registerKeywords } from 'ember-a11y/utils/ember-internals';
registerKeywords();

let stashedHandlerInfos = {};

Ember.Router.reopen({
  willTransition(oldHandlerInfos, newHandlerInfos /* transition */) {
    let pivotHandler = pivotRouteIdentifier(oldHandlerInfos, newHandlerInfos);
    stashedHandlerInfos.pivotHandler = pivotHandler;
    this._super(...arguments);
  }
});

export function initialize(instance) {
  const lookupContext = instance.lookup ? instance : instance.container;
  lookupContext.lookup('application:main')._stashedHandlerInfos = stashedHandlerInfos;
}

export default {
  name: 'ember-a11y',
  initialize
};
