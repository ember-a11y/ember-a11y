import { Promise } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    var delayPromise = new Promise(function(resolve) {
      setTimeout(resolve, 3000);
    });
    return delayPromise;
  }
});
