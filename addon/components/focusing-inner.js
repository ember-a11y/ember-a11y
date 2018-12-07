import Ember from 'ember';

let scrollLeft = 0;
let scrollTop = 0;
let handler = function() {
  window.scrollTo(scrollLeft, scrollTop);
  window.removeEventListener('scroll', handler);
};

let FocusingInner = Ember.Component.extend({
  tagName: 'div',
  classNames: ['focusing-outlet'],

  shouldFocus: false,

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

      // If we don't do this, the scroll triggered by the focus will be unfortunate.
      // This effectively swallows one scroll event.
      // TODO: Investigate setting focus to something inside of overflow: auto;
      scrollLeft = document.body.scrollLeft;
      scrollTop = document.body.scrollTop;
      window.addEventListener('scroll', handler);

      // Set the focus to the target outlet wrapper.
      Ember.run.schedule('afterRender', this, function() {
        if (!this.element) { return; }

        this.element.blur();
        Ember.run.next(this, function() {
          if (!this.element) { return; }

          this.element.focus();
        });
      });
    } else {
      this.element.removeAttribute('tabindex');
      this.element.removeAttribute('role');
    }
  },

  // This fires every time outletState changes.
  // That is our cue that we want to set focus.
  watcher: Ember.observer('outletState', function() {
    const outletName = this.get('outletName');
    const outletState = this.get('outletState');

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

    this.setFocus();
  })
});

export default FocusingInner;
