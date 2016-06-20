import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return params;
  },

  redirect(model, transition) {
    transition.abort();
    this.transitionTo(model.target);
  }
});
