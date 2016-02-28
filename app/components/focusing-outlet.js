import Ember from "ember";

let FocusingOutlet = Ember.Component.extend({
  _routing: Ember.inject.service('-routing'),
  positionalParams: ['inputOutletName'], // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
  tagName: 'div',

  shouldFocus: false,

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('outletName', this.attrs.inputOutletName || 'main');
  },

  didInsertElement() {
    this._super(...arguments);
    this.setFocus();
  },

  setFocus() {
    if (!this.element) { return; }

    let shouldFocus = this.get('shouldFocus');

    if (shouldFocus) {
      this.element.setAttribute('tabindex', '-1');
      this.element.focus();
    } else {
      this.element.removeAttribute('tabindex');
    }
  },

  actions: {
    checkFocus(outletState) {
      let outletName = this.get('outletName');

      let pivotHandler = Ember.getOwner(this)._stashedHandlerInfos.pivotHandler.handler.routeName;
      let currentRoute = outletState[outletName].render.name;

      let shouldFocus = (pivotHandler === currentRoute);
      this.set('shouldFocus', shouldFocus);

      this.setFocus();
    }
  }
});

FocusingOutlet.reopenClass({
  positionalParams: ['inputOutletName']
});

export default FocusingOutlet;
