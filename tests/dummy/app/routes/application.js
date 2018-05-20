import Route from '@ember/routing/route';
import config from '../config/environment';

export default Route.extend({
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
