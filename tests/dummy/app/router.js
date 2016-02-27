import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('foo', function() {
    this.route('a', function() {
      this.route('one');
    });
    this.route('b');
    this.route('c');
  });
  this.route('bar', function() {
    this.route('a');
    this.route('b');
    this.route('c');

  });
});

export default Router;
