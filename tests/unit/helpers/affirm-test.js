import { affirm } from 'dummy/helpers/affirm';
import { module, test } from 'qunit';

module('Unit | Helper | affirm');

let actual, expected;

// Replace this with your real tests.
test('answering in the affirmative depending on the truthiness of its argument', function(assert) {
  actual = affirm([42]);
  expected = 'Yes';
  assert.equal(actual, expected);

  actual = affirm([0]);
  expected = 'No';
  assert.equal(actual, expected);

  actual = affirm([false]);
  expected = 'No';
  assert.equal(actual, expected);

  actual = affirm([true]);
  expected = 'Yes';
  assert.equal(actual, expected);

  actual = affirm([undefined]);
  expected = 'No';
  assert.equal(actual, expected);

  actual = affirm([null]);
  expected = 'No';
  assert.equal(actual, expected);

  actual = affirm(['foo']);
  expected = 'Yes';
  assert.equal(actual, expected);

  actual = affirm(['']);
  expected = 'No';
  assert.equal(actual, expected);





});
