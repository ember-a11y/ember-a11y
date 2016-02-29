import Ember from "ember";

let FocusingOutlet = Ember.Component.extend({
  _routing: Ember.inject.service('-routing'),
  positionalParams: ['inputOutletName'], // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
  tagName: 'div',
  classNames: ['focusing-outlet'],

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
      // One shouldn't set an attribute when they mean to set a property.
      // Except when a property is only settable if the attribute is present.
      // We have to make the element interactive prior to focusing it.
      this.element.setAttribute('tabindex', '-1');

      // If we don't do this, the scroll triggered by the focus will be unfortunate.
      // This effectively swallows one scroll event.
      let scrollTop = document.body.scrollTop;
      let handler = function(e) {
        window.scrollTo(0, scrollTop);
        window.removeEventListener('scroll', handler);
      };
      window.addEventListener('scroll', handler);
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
