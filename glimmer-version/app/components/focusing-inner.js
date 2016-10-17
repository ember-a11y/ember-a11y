import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  didUpdateAttrs() {
    this._super(...arguments);
    this.attrs.focus(this.get('outletState'))
  }
});
