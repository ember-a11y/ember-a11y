// This initializer exists only to make sure that the following
// imports happen before the app boots.
import Ember from 'ember';
import { registerKeywords } from 'ember-a11y/ember-internals';
import pivotRouteIdentifier from 'ember-a11y/utils/pivot-route-identifier';

registerKeywords();

let stashedHandlerInfos = {};

Ember.Router.reopen({
  didTransition(handlerInfos) {
    let pivotHandler = pivotRouteIdentifier(stashedHandlerInfos.handlerInfos, handlerInfos);
    stashedHandlerInfos.handlerInfos = handlerInfos;
    stashedHandlerInfos.pivotHandler = pivotHandler;
    this._super(...arguments);
  }
});

export function initialize(application) {
  application._stashedHandlerInfos = stashedHandlerInfos;
}

export default {
  name: 'ember-a11y',
  initialize
};
