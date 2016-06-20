import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    return params;
  },

  redirect(model) {
    this.transitionTo(model.target);
  }
});
