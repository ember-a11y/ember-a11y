import Ember from "ember";
import FocusingOutletMixin from 'ember-a11y/mixins/focusing';
import getOwner from 'ember-getowner-polyfill';

const {
  get,
  Component
} = Ember;

let FocusingOutlet = Component.extend(FocusingOutletMixin, {
  getOwner,
  positionalParams: ['inputOutletName'] // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support
});

FocusingOutlet.reopenClass({
  positionalParams: ['inputOutletName']
});

export default FocusingOutlet;
