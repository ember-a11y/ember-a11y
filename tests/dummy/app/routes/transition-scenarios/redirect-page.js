import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  TransitionReporter: service('transition-reporter'),

  beforeModel (transition) {
    const TransitionReporter = this.get('TransitionReporter');

    TransitionReporter.pushTransition(transition);
  },

  model () {
    return this.modelFor('transition-scenarios');
  },

  afterModel (model, transition) {
    debugger;
  }
});
