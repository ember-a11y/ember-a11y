import Ember from 'ember';
import layout from '../templates/components/focusing-outlet';

let FocusingOutlet = Ember.Component.extend({
  tagName: '',
  layout,

  positionalParams: ['inputOutletName'], // needed for Ember 1.13.[0-5] and 2.0.0-beta.[1-3] support

  outletName: Ember.computed('inputOutletName', function() {
    return this.get('inputOutletName') || 'main';
  }),

  outletState: null
});

FocusingOutlet.reopenClass({
  positionalParams: ['inputOutletName']
});

export default FocusingOutlet;
