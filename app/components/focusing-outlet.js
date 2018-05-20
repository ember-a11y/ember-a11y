import Component from '@ember/component';
import FocusingOutletMixin from 'ember-a11y/mixins/focusing';

let FocusingOutlet = Component.extend(FocusingOutletMixin, {
  currentOutletRouteKeyPrefix: 'outlets'
});

FocusingOutlet.reopenClass({
  positionalParams: ['inputOutletName']
});

export default FocusingOutlet;
