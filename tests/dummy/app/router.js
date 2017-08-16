import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {

  // Routes to test reading.
  this.route('feed');
  this.route('profile');

  // Routes to test focus traversal.
  this.route('messages', function() {
    this.route('message', {path: "/:id"});
  });

  // Routes to test focusing outlet on last route in a route path
  this.route('about');

  // Routes to test loading and error states.
  this.route('boom');
  this.route('boomsubstate');
  this.route('slow');

  this.route('parent', function() {
    this.route('boom');
    this.route('boomsubstate');
  });

  this.route('iso-parent', function() {
    this.route('boom');
  });

});

export default Router;
