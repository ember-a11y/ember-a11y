import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    reload() {
      window.location.reload(true);
    }
  }
});
