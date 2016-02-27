import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('focusing-outlet', 'Integration | Component | focusing outlet', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{focusing-outlet}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#focusing-outlet}}
      template block text
    {{/focusing-outlet}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
