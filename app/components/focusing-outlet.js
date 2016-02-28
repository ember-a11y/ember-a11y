import Ember from "ember";

let FocusingOutlet = Ember.Component.extend({
  _routing: Ember.inject.service('-routing'),
  positionalParams: ['inputOutletName'], // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
  tagName: 'div',

  shouldFocus: false,

  init() {
    this._super(...arguments);

    this.get('_routing.router').on('willTransition', function() {
      // this.set('shouldFocus', false);
    });

    this.get('_routing.router').on('didTransition', function() {
      if (this.get('shouldFocus')) {
        // TODO: add tabindex
        // this.element.focus();
      }
    });
  },

  // TODO: Clean up randomly added events.

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('outletName', this.attrs.inputOutletName || 'main');
  },

  actions: {
    checkFocus(outletState) {
      let pivotHandler = Ember.getOwner(this)._stashedHandlerInfos.pivotHandler.handler.routeName;
      let currentRoute = outletState.main.render.name;
      let shouldFocus = (pivotHandler === currentRoute);
      if (shouldFocus) {
        this.set('shouldFocus', 'focus');
        // alert('focus ' + currentRoute);
      } else {
        this.set('shouldFocus', '');
      }
      // this.set('shouldFocus', shouldFocus);
    }
  }
});

FocusingOutlet.reopenClass({
  positionalParams: ['inputOutletName']
});

export default FocusingOutlet;
