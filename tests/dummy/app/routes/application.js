import Ember from 'ember';
import config from '../config/environment';

const { Route, inject: { service }} = Ember;

export default Route.extend({

  TransitionReporter: service('transition-reporter'),

  model() {
    let prefix = config.locationType === 'hash' ? '#/' : './';
    return { prefix };
  },

  actions: {

    willTransition(transition) {
      this.get('TransitionReporter').pushTransition(transition);
      this._super(...arguments);
    },

    resetDemo() {
      this.transitionTo('index').then(() => this.send('reload'));
    },

    reload() {
      window.location.reload(true);
    }
  }
});
