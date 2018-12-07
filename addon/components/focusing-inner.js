import Ember from 'ember';

let FocusingInner = Ember.Component.extend({
  tagName: 'div',
  classNames: ['focusing-outlet'],

  outletName: null,
  shouldFocus: false,

  didInsertElement() {
    this._super(...arguments);
    this.scheduleFocus();
  },

  // This fires every time outletState changes.
  // That is our cue that we want to set focus.
  watcher: Ember.observer('outletState', function() {
    let outletName = this.get('outletName');
    let outletState = this.get('outletState');

    let application = Ember.getOwner(this).lookup('application:main');
    let pivotHandler = application.get('_stashedHandlerInfos.pivotHandler.handler.routeName');

    let currentRoute = Ember.get(outletState, `outlets.${outletName}.render.name`);
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
      application.set('_stashedHandlerInfos.pivotHandler.handled', handled || (shouldFocus && !isChildState));
    }

    this.scheduleFocus();
  }),

  scheduleFocus() {
    if (!this.element) { return; }

    if (
      this.get('shouldFocus') &&
      !this.isDestroyed &&
      !this.isDestroying
    ) {
      // We need to wait until the content is rendered into the outlet before setting focus.
      Ember.run.scheduleOnce('afterRender', this, 'setFocus');
    } else {
      this.element.removeAttribute('tabindex');
      this.element.removeAttribute('role');
    }
  },

  setFocus() {
    if (!this.element) { return; }

    if (
      this.get('shouldFocus') &&
      !this.isDestroyed &&
      !this.isDestroying
    ) {
      // Just in case it is currently focused.
      this.element.blur();

      // We have to make the element interactive prior to focusing it.
      this.element.setAttribute('tabindex', '-1');
      this.element.setAttribute('role', 'group');
      this.scrollPositionFocus();
    }
  },

  scrollPositionFocus() {
    let parents = [];

    for (let current = this.element; current; current = current.parentNode) {
      parents.push({ element: current, scrollTop: current.scrollTop, scrollLeft: current.scrollLeft });
    }

    this.element.focus();

    // Reset the scroll position for the entire hierarchy.
    for (let i = 0; i < parents.length; i++) {
      let scrollConfig = parents[i];
      let element = scrollConfig.element;

      element.scrollTop = scrollConfig.scrollTop;
      element.scrollLeft = scrollConfig.scrollLeft;
    }
  }
});

export default FocusingInner;
