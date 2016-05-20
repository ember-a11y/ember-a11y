// This initializer exists only to make sure that the following
// imports happen before the app boots.
import Ember from 'ember';
import { registerKeywords } from 'ember-a11y/ember-internals';
import pivotRouteIdentifier from 'ember-a11y/utils/pivot-route-identifier';

registerKeywords();

let stashedHandlerInfos = {};

Ember.Router.reopen({
  willTransition(oldHandlerInfos, newHandlerInfos /* transition */) {
    let pivotHandler = pivotRouteIdentifier(oldHandlerInfos, newHandlerInfos);
    stashedHandlerInfos.pivotHandler = pivotHandler;
    this._super(...arguments);
  }
});

export function initialize(applicationInstance) {
  if (arguments.length > 1) {
    applicationInstance = arguments[1];
  }
  const container = applicationInstance.container ? applicationInstance.container : applicationInstance.__container__;
  const application = container.lookup('application:main');

  application._stashedHandlerInfos = stashedHandlerInfos;
}

export default {
  name: 'ember-a11y',
  initialize
};
