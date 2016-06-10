import Ember from 'ember';

const { A, Service, computed } = Ember;
const { readOnly, and, not } = computed;

export default Service.extend({

  // transition history
  stack: A(),

  shouldCancelCurrentTransition: false,

  errors: {
    focus: null
  },

  checkedToFocus: false,
  shouldHaveCheckedToFocus: false,

  focusNotChecked: not('checkedToFocus'),
  shouldNotHaveCheckForFocus: not('shouldHaveCheckedToFocus'),


  madeUnexpectedFocus: and('checkedToFocus', 'shouldNotHaveCheckForFocus'),
  failedToFocus: and('focusNotChecked', 'shouldHaveCheckedToFocus'),

  focusCheckError: computed('checkedToFocus', 'shouldHaveCheckedToFocus', function () {
    const checkedToFocus = this.get('checkedToFocus');
    const shouldHaveCheckedToFocus = this.get('shouldHaveCheckedToFocus');

    if (checkedToFocus && !shouldHaveCheckedToFocus) {
      return 'Unexpected Focus Check';
    }
    if (!checkedToFocus && shouldHaveCheckedToFocus) {
      return 'Expected a focus check, but none occured';
    }

    // otherwise
    return null;
  }),

  mostRecentTransition: readOnly('stack.lastObject'),

  previousTransition: computed('stack.[]', function() {
    return this.get('stack').objectAt(this.get('stack.length') - 2);
  }),

  pushTransition (transition) {
    this.get('stack').addObject(transition);
  },

  reset () {
    this.get('stack').clear();
  }
});
