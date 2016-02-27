import Ember from 'ember';
import EmberA11yInitializer from '../../../initializers/ember-a11y';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | ember a11y', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  EmberA11yInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
