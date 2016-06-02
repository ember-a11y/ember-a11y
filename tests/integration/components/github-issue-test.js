import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { base } from '../../../components/github-issue';

moduleForComponent('github-issue', 'Integration | Component | github-issue', {
  integration: true
});

var baseURIComponent = encodeURIComponent(base);
var linebreak = encodeURIComponent("\r\n");

test('It renders.', function(assert) {
  this.render(hbs`{{github-issue title="Reading Behavior"}}`);
  assert.equal(this.$('a')[0].href, `https://github.com/ember-a11y/ember-a11y/issues/new?title=Demo%20App%20Issue%3A%20Reading%20Behavior&body=${baseURIComponent}${linebreak}`);

  this.render(hbs`{{github-issue title="Reading Behavior" body="[//]: # (Additional comment.)"}}`);
  assert.equal(this.$('a')[0].href, `https://github.com/ember-a11y/ember-a11y/issues/new?title=Demo%20App%20Issue%3A%20Reading%20Behavior&body=${baseURIComponent}${encodeURIComponent("[//]: # (Additional comment.)")}${linebreak}${linebreak}`);
});
