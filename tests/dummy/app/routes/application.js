import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
  model() {
    let prefix = config.locationType === 'hash' ? '#/' : './';
    return { prefix };
  },
  actions: {
    reload() {
      window.location.reload(true);
    }
  }
});
