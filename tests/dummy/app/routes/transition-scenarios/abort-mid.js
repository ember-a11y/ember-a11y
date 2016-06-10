import Ember from 'ember';

const { Route, inject: { service } } = Ember;

export default Route.extend({
  TransitionReporter: service('transition-reporter'),

  beforeModel (transition) {
    debugger;
    const TransitionReporter = this.get('TransitionReporter');
    const isAtteptingRetry = TransitionReporter.get('isAtteptingRetry');

    TransitionReporter.set('isAtteptingRetry', false);
    TransitionReporter.set('shouldHaveCheckedToFocus', false);

    return isAtteptingRetry ? transition.retry() : transition.abort();
  }
});
