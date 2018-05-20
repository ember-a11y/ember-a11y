import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { base } from '../../../components/github-issue';

module('Integration | Component | github-issue', function(hooks) {
  setupRenderingTest(hooks);

  var baseURIComponent = encodeURIComponent(base);
  var linebreak = encodeURIComponent("\r\n");

  test('It renders.', async function(assert) {
    await render(hbs`{{github-issue title="Reading Behavior"}}`);
    assert.equal(this.$('a')[0].href, `https://github.com/ember-a11y/ember-a11y/issues/new?title=Demo%20App%20Issue%3A%20Reading%20Behavior&body=${baseURIComponent}${linebreak}`);

    await render(hbs`{{github-issue title="Reading Behavior" body="[//]: # (Additional comment.)"}}`);
    assert.equal(this.$('a')[0].href, `https://github.com/ember-a11y/ember-a11y/issues/new?title=Demo%20App%20Issue%3A%20Reading%20Behavior&body=${baseURIComponent}${encodeURIComponent("[//]: # (Additional comment.)")}${linebreak}${linebreak}`);
  });
});
