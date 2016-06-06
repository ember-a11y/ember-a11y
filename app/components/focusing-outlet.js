import Ember from "ember";
import getOwner from 'ember-getowner-polyfill';

const { get } = Ember;

let scrollLeft = 0;
let scrollTop = 0;
let elemToScrollIntoView = null;

const focusHandler = function({ target: focusedElem }) {
  console.log(`Captured scroll event on ${focusedElem}. Scrolling to (${scrollLeft}, ${scrollTop})`);
  debugger;
  window.scrollTo(scrollLeft, scrollTop);
  focusedElem.removeEventListener('focus', focusHandler);
};

const focusElement = function focusElement() {
  this.element.focus();
};

let FocusingOutlet = Ember.Component.extend({
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
      this.element.setAttribute('role', 'group');


      // -------------------
      // Set the focus to the target outlet wrapper and handle the event that's fired from doing so.
      // If we don't do this, the scroll triggered by the focus will be unfortunate.
      // This effectively swallows one scroll event.
      // TODO: Investigate setting focus to something inside of overflow: auto;
      // -------------------

      // TODO: Do we cache document.body.scrollTop, or the current scroll position of the
      // focusing outlet's container?
      scrollLeft = document.body.scrollLeft;
      scrollTop = document.body.scrollTop;

      this.element.addEventListener('focus', focusHandler);

      // Calling `this.element.focus()` directly (without scheduling it on the `afterRender` queue,
      // skips the scrolling behavior that would otherwise take place in an element
      // with overflow: auto)
      this.element.focus();
      // uncomment the line below (and comment out the line above) to compare behavior
      // Ember.run.scheduleOnce('afterRender', this, focusElement);

    } else {
      this.element.removeAttribute('tabindex');
      this.element.removeAttribute('role');
    }
  },


  willDestroyElement() {
    this._super(...arguments);

    // this._removeListeners();  // TODO: Implement
  },

  actions: {
    checkFocus(outletState) {
      let application = getOwner(this).lookup('application:main');
      let pivotHandler = application.get('_stashedHandlerInfos.pivotHandler.handler.routeName');

      let outletName = this.get('outletName');

      let currentRoute = get(outletState, `${outletName}.render.name`);
      if (!currentRoute) {
        return;
      }

      let handled = application.get('_stashedHandlerInfos.pivotHandler.handled');
      let isFirstVisit = pivotHandler === undefined;
      let isPivot = (pivotHandler === currentRoute);
      let isChildState = ~['loading', 'error'].indexOf(currentRoute.split('.').pop());
      let isSubstate = ~currentRoute.indexOf('_loading') || ~currentRoute.indexOf('_error');

      let shouldFocus = !handled && !isFirstVisit && (isPivot || isChildState || isSubstate);
      this.set('shouldFocus', shouldFocus);

      if (pivotHandler) {
        application.set('_stashedHandlerInfos.pivotHandler.handled', handled || shouldFocus);
      }

      this.setFocus();
    }
  }
});

FocusingOutlet.reopenClass({
  positionalParams: ['inputOutletName']
});

export default FocusingOutlet;
