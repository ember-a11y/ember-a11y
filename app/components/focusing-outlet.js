import Ember from "ember";

let setup = false;
let addEventListener = function(router) {
  if (setup) { return; }
  setup = true;
  console.log('event added');
  router.on('didTransition', function() {
    console.log('router didTransition');
  });
}

let FocusingOutlet = Ember.Component.extend({
  _routing: Ember.inject.service('-routing'),
  positionalParams: ['inputOutletName'], // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
  tagName: 'div',

  classNameBindings: ['shouldFocus'],
  shouldFocus: Ember.computed(function() {
    return 'focus';
  }),

  init() {
    this._super(...arguments);
    let routing = this.get('_routing');
    addEventListener(routing.router)
  },
  didReceiveAttrs() {
    this._super(...arguments);
    this.set('outletName', this.attrs.inputOutletName || 'main');
  }
});

FocusingOutlet.reopenClass({
  positionalParams: ['inputOutletName']
});

export default FocusingOutlet;
