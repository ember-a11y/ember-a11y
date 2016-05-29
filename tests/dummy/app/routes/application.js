import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  model() {
    let prefix = config.locationType === 'hash' ? '#/' : './';
    return { prefix };
  },
  actions: {
    resetDemo() {
      this.transitionTo('index').then(() => this.send('reload'));
    },

    reload() {
      window.location.reload(true);
    }
  }
});
