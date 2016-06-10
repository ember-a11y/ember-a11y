import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  TransitionReporter: service('transition-reporter'),

  beforeModel (transition) {
    const TransitionReporter = this.get('TransitionReporter');

    TransitionReporter.set('shouldHaveCheckedToFocus', true);
  },

  model () {
    return this.modelFor('transition-scenarios');
  },

  afterModel (model, transition) {
  }
});
