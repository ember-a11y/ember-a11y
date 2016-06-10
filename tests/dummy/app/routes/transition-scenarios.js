import Ember from 'ember';

const {
  Route,
  Object: EmberObject,
  inject: { service },
  computed: { readOnly }
} = Ember;

const TransitionLog = EmberObject.extend({
  reporter: null,
  shouldReportResults: false,
  transitionHistory: readOnly('reporter.stack.[]'),
  mostRecentTransition: readOnly('reporter.mostRecentTransition'),
  previousTransition: readOnly('reporter.previousTransition')
});

const SCENARIO_HANDLER_MAP = {
  abort: 'simulateAbort',
  redirect: 'simulateRedirect',
  abortAndStartNew: 'simulateAbortAndStartNew',
  abortAndRetry: 'simulateLaterRetry'
};

export default Route.extend({

  TransitionReporter: service('transition-reporter'),

  simulateAbort() {
    return this.transitionTo('transition-scenarios.abort-mid');
  },

  simulateRedirect() {
    return this.transitionTo('transition-scenarios.redirect-mid');
  },

  simulateSuccessfulTransition() {
    return this.transitionTo('transition-scenarios.success-destination');
  },

  simulateAbortAndStartNew () {
    return this.simulateAbort().catch(this.simulateSuccessfulTransition());
  },

  simulateLaterRetry () {
    const TransitionReporter = this.get('TransitionReporter');

    TransitionReporter.set('shouldCancelCurrentTransition', true);

    return this
      .simulateSuccessfulTransition()
      .catch(() => {
        const abortedTransition = TransitionReporter.get('mostRecentTransition');
        abortedTransition.retry();
      });
  },

  beforeModel (transition) {
    const TransitionReporter = this.get('TransitionReporter');

    TransitionReporter.pushTransition(transition);
    TransitionReporter.set('shouldHaveCheckedToFocus', true);
  },

  model (params, transition) {
    const TransitionReporter = this.get('TransitionReporter');

    return TransitionLog.create({
      reporter: TransitionReporter
    });
  },

  actions: {
    triggerTest (testType) {
      this.currentModel.set('shouldReportResults', true);
      this[SCENARIO_HANDLER_MAP[testType]]();
    },

    clearResults () {
      this.get('TransitionReporter').reset();
      this.currentModel.set('shouldReportResults', false);
      return this.transitionTo('transition-scenarios');
    },

    willTransition (transition) {
      const TransitionReporter = this.get('TransitionReporter');

      TransitionReporter.set('checkedToFocus', false);

      if (TransitionReporter.get('shouldCancelCurrentTransition')) {
        TransitionReporter.set('shouldCancelCurrentTransition', false);
        // since we won't bubble after aborting, we need to add to the stack here
        TransitionReporter.pushTransition(transition);
        return transition.abort();
      }
      return true;
    },

    reload () {
      window.location.reload(true);
    },

    didTransition () {
      return true;
    }
  }

});
