import { reject } from 'rsvp';
import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return reject();
  }
});
