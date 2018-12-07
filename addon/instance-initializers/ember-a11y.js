// This initializer exists only to make sure that the following
// imports happen before the app boots.
import Ember from 'ember';
import pivotRouteIdentifier from 'ember-a11y/utils/pivot-route-identifier';

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
