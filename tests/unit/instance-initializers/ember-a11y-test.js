import Application from '@ember/application';
import { run } from '@ember/runloop';
import EmberA11yInitializer from '../../../instance-initializers/ember-a11y';
import { module, test } from 'qunit';

let application;

module('Unit | Instance Initializer | ember a11y', function(hooks) {
  hooks.beforeEach(function() {
    run(function() {
      application = Application.create();
      application.deferReadiness();

      // Force `lookup` to exist prior to `ready`.
      // Guarded because `buildInstance` doesn't exist in 1.13.
      if (application.buildInstance) {
        application = application.buildInstance();
      }
    });
  });

  // Replace this with your real tests.
  test('it works', function(assert) {
    EmberA11yInitializer.initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
