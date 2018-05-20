import Component from '@ember/component';

export default Component.extend({
  didUpdateAttrs() {
    this._super(...arguments);
    this.attrs.focus(this.outletState)
  }
});
