import Ember from 'ember';
import layout from '../templates/components/focusing-outlet';

let FocusingOutlet = Ember.Component.extend({
  tagName: '',
  layout,

  outletName: Ember.computed('inputOutletName', function() {
    return this.get('inputOutletName') || 'main';
  })
});

FocusingOutlet.reopenClass({
  positionalParams: ['inputOutletName']
});

export default FocusingOutlet;
