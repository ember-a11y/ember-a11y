import { githubIssue } from 'dummy/helpers/github-issue';
import { module, test } from 'qunit';

module('Unit | Helper | github issue');

test('Github Issue helper generates correct link url', function(assert) {
	assert.expect(1);
  let testStr = "Highly Topical";
  let domEl = githubIssue([testStr]);
  assert.equal(domEl.children[0].href, 'https://github.com/nathanhammond/ember-a11y/issues/new?title=Demo%20App%20Test%20fail%3A%20Highly%20Topical');
});
