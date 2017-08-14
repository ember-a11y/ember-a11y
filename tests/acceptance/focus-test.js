import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

function checkFocus() {
  let element = document.activeElement;
  let valueElem = element.querySelector('h1,h2,h3,h4,h5,h6');
  return valueElem.textContent;
}

moduleForAcceptance('Acceptance | Focus Handling');

test('Checking focus while navigating', function(assert) {
  visit('/');

  visit('/messages');
  andThen(() => { assert.equal(checkFocus(), 'Messages'); });

  visit('/feed');
  andThen(() => { assert.equal(checkFocus(), 'Feed'); });

  visit('/messages/Jimmy');
  andThen(() => { assert.equal(checkFocus(), 'Messages'); });

  visit('/messages');
  andThen(() => { assert.equal(checkFocus(), 'Conversations'); });
});

test('Linking to peers with local error states', function(assert) {
  visit('/');

  visit('/feed');
  andThen(() => { assert.equal(checkFocus(), 'Feed'); });

  visit('/boom');
  andThen(() => { assert.equal(checkFocus(), 'Global Error'); });

  visit('/profile');
  andThen(() => { assert.equal(checkFocus(), 'John Doe'); });

  visit('/boomsubstate');
  andThen(() => { assert.equal(checkFocus(), 'Boom Substate Error'); });
});

test('Linking across levels to routes with local error states', function(assert) {
  visit('/');

  visit('/feed');
  andThen(() => { assert.equal(checkFocus(), 'Feed'); });

  visit('/parent/boom');
  andThen(() => { assert.equal(checkFocus(), 'Parent'); });

  visit('/profile');
  andThen(() => { assert.equal(checkFocus(), 'John Doe'); });

  visit('/parent/boomsubstate');
  andThen(() => { assert.equal(checkFocus(), 'Parent'); });
});

test('Linking to descendant routes with local error states.', function(assert) {
  visit('/');

  visit('/feed');
  andThen(() => { assert.equal(checkFocus(), 'Feed'); });

  visit('/parent');
  andThen(() => { assert.equal(checkFocus(), 'Parent'); });

  visit('/parent/boom');
  andThen(() => { assert.equal(checkFocus(), 'Parent Error'); });

  visit('/profile');
  andThen(() => { assert.equal(checkFocus(), 'John Doe'); });

  visit('/parent');
  andThen(() => { assert.equal(checkFocus(), 'Parent'); });

  visit('/parent/boomsubstate');
  andThen(() => { assert.equal(checkFocus(), 'Boom Substate Error'); });
});

test('Linking to descendant routes with local error states.', function(assert) {
  visit('/');

  visit('/feed');
  andThen(() => { assert.equal(checkFocus(), 'Feed'); });

  visit('/iso-parent/boom');
  andThen(() => { assert.equal(checkFocus(), 'Global Error'); });

  visit('/profile');
  andThen(() => { assert.equal(checkFocus(), 'John Doe'); });

  visit('/iso-parent');
  andThen(() => { assert.equal(checkFocus(), 'Isolated Parent'); });

  visit('/iso-parent/boom');
  andThen(() => { assert.equal(checkFocus(), 'Global Error'); });
});

test('Linking to a slow loading route', function(assert) {
  visit('/');

  let focusingOutlet;
  let focusCount = 0;
  let blurCount = 0;

  andThen(() => {
    focusingOutlet = document.querySelector('.focusing-outlet');

    focusingOutlet.focusStub = focusingOutlet.focus;
    focusingOutlet.focus = () => {
      focusCount++;
      focusingOutlet.focusStub();
    };

    focusingOutlet.blurStub = focusingOutlet.blur;
    focusingOutlet.blur = () => {
      blurCount++;
      focusingOutlet.blurStub();
    };
  });

  visit('/slow');

  andThen(() => {
    assert.equal(focusCount, 2);
    assert.equal(blurCount, 2);
    assert.equal(checkFocus(), 'Slow Route');

    focusingOutlet.focus = focusingOutlet.focusStub;
    focusingOutlet.blur = focusingOutlet.blurStub;
  });
});

test('Should load leaf routes with a spurious focusing focusingOutlet without any errors.', function(assert) {
  visit('/');
  visit('/about');
  andThen(() => { assert.equal(checkFocus(), 'About Us'); });
});
