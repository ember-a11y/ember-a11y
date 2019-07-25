import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { base } from '../../../components/github-issue';

var baseURIComponent = encodeURIComponent(base);
var linebreak = encodeURIComponent("\r\n");

module('Integration | Component | github-issue', function(hooks) {
  setupRenderingTest(hooks);

  test('It renders with title', async function(assert) {
    await render(hbs`{{github-issue title="Reading Behavior"}}`);
    let href = find('a').getAttribute('href');
    assert.equal(href, `https://github.com/ember-a11y/ember-a11y/issues/new?title=Demo%20App%20Issue%3A%20Reading%20Behavior&body=${baseURIComponent}${linebreak}`);
  });

  test('It renders with title and body', async function(assert) {
    await render(hbs`{{github-issue title="Reading Behavior" body="[//]: # (Additional comment.)"}}`);
    let href = find('a').getAttribute('href');
    assert.equal(href, `https://github.com/ember-a11y/ember-a11y/issues/new?title=Demo%20App%20Issue%3A%20Reading%20Behavior&body=${baseURIComponent}${encodeURIComponent("[//]: # (Additional comment.)")}${linebreak}${linebreak}`);
  });
});
