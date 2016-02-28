import Ember from "ember";

let FocusingOutlet = Ember.Component.extend({
  positionalParams: ['inputOutletName'], // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
  tagName: 'div',

  classNameBindings: ['shouldFocus'],
  shouldFocus: Ember.computed(function() {
    Ember.getOwner(this)._stashedHandlerInfos;
    return 'focus';
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    this.set('outletName', this.attrs.inputOutletName || 'main');
  }
});

FocusingOutlet.reopenClass({
  positionalParams: ['inputOutletName']
});

export default FocusingOutlet;
