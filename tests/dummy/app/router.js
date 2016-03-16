import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  // Routes to test reading.
  this.route('feed');
  this.route('profile');

  // Routes to test focus traversal.
  this.route('messages', function() {
    this.route('message', {path: "/:id"});
  });

  // Routes to test loading and error states globally.
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

  this.route('global-substates-parent', function() {
    this.route('global-substates-child', function() {
      this.route('boom');
      this.route('slow');
    });
    this.route('boom');
    this.route('slow');
  });

  // Routes to test loading and error states locally.
  this.route('local-substates-parent', function() {
    this.route('local-substates-child', function() {
      this.route('local-substates-grandchild', function() {
        this.route('boom');
        this.route('slow');
      });
      this.route('boom');
      this.route('slow');
    });
    this.route('boom');
    this.route('slow');
  });

});

export default Router;
