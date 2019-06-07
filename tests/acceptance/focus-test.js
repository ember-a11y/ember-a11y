import { module, test } from 'qunit';
import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

function checkFocus() {
  let element = document.activeElement;
  let valueElem = element.querySelector('h1,h2,h3,h4,h5,h6');
  return valueElem.textContent;
}

module('Acceptance | Focus Handling', function(hooks) {
  setupApplicationTest(hooks);

  test('Checking focus while navigating', async function(assert) {
    await visit('/');

    await visit('/messages');
    assert.equal(checkFocus(), 'Messages');

    await visit('/feed');
    assert.equal(checkFocus(), 'Feed');

    await visit('/messages/Jimmy');
    assert.equal(checkFocus(), 'Messages');

    await visit('/messages');
    assert.equal(checkFocus(), 'Conversations');
  });

  test('Linking to peers with local error states', async function(assert) {
    await visit('/');

    await visit('/feed');
    assert.equal(checkFocus(), 'Feed');

    await visit('/boom');
    assert.equal(checkFocus(), 'Global Error');

    await visit('/profile');
    assert.equal(checkFocus(), 'John Doe');

    await visit('/boomsubstate');
    assert.equal(checkFocus(), 'Boom Substate Error');
  });

  test('Linking across levels to routes with local error states', async function(assert) {
    await visit('/');

    await visit('/feed');
    assert.equal(checkFocus(), 'Feed');

    await visit('/parent/boom');
    assert.equal(checkFocus(), 'Parent');

    await visit('/profile');
    assert.equal(checkFocus(), 'John Doe');

    await visit('/parent/boomsubstate');
    assert.equal(checkFocus(), 'Parent');
  });

  test('Linking to descendant routes with local error states.', async function(assert) {
    await visit('/');

    await visit('/feed');
    assert.equal(checkFocus(), 'Feed');

    await visit('/parent');
    assert.equal(checkFocus(), 'Parent');

    await visit('/parent/boom');
    assert.equal(checkFocus(), 'Parent Error');

    await visit('/profile');
    assert.equal(checkFocus(), 'John Doe');

    await visit('/parent');
    assert.equal(checkFocus(), 'Parent');

    await visit('/parent/boomsubstate');
    assert.equal(checkFocus(), 'Boom Substate Error');
  });

  test('Linking to descendant routes with local error states.', async function(assert) {
    await visit('/');

    await visit('/feed');
    assert.equal(checkFocus(), 'Feed');

    await visit('/iso-parent/boom');
    assert.equal(checkFocus(), 'Global Error');

    await visit('/profile');
    assert.equal(checkFocus(), 'John Doe');

    await visit('/iso-parent');
    assert.equal(checkFocus(), 'Isolated Parent');

    await visit('/iso-parent/boom');
    assert.equal(checkFocus(), 'Global Error');
  });

  test('Linking to a slow loading route', async function(assert) {
    await visit('/');

    let focusingOutlet;
    let focusCount = 0;
    let blurCount = 0;

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

    await visit('/slow');

    assert.equal(focusCount, 2);
    assert.equal(blurCount, 2);
    assert.equal(checkFocus(), 'Slow Route');

    focusingOutlet.focus = focusingOutlet.focusStub;
    focusingOutlet.blur = focusingOutlet.blurStub;
  });

  test('Should load leaf routes with a spurious focusing focusingOutlet without any errors.', async function(assert) {
    await visit('/');
    await visit('/about');
    assert.equal(checkFocus(), 'About Us');
  });
});

