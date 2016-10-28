import Ember from 'ember';
import FocusingOutletMixin from 'ember-a11y/mixins/focusing';

const {
  Component
} = Ember;

let FocusingOutlet = Component.extend(FocusingOutletMixin, {
  currentOutletRouteKeyPrefix: 'outlets'
});

FocusingOutlet.reopenClass({
  positionalParams: ['inputOutletName']
});

export default FocusingOutlet;
