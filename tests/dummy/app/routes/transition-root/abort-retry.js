import Ember from 'ember';

let retrying = false;

export default Ember.Route.extend({
  beforeModel(transition) {
    if (!retrying) {
      retrying = true;
      transition.abort();
      transition.retry();
    }
  }
});
