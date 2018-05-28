import Route from '@ember/routing/route';
import { A } from '@ember/array';
import EmberObject, { computed } from '@ember/object';

// Feed items have a backing class!
const FeedItem = EmberObject.extend({
  title: null,
  type: null,
  createdAt: null,
  displayDate: computed('createdAt', function () {
    return `${this.get('createdAt').toDateString()}`;
  })
});

// Builds a newsfeed.
function createFeed(filter) {
  const now = Date.now();

  let base = A([
    FeedItem.create({ title: 'Nathan liked your post "Why A11y is Awesome".', type: 'Likes', createdAt: new Date(now - 10e7 * 10) }),
    FeedItem.create({ title: 'Tomster sent you a private message.', type: 'Messages', createdAt: new Date(now - 10e7 * 8) }),
    FeedItem.create({ title: 'Tomster liked your post "Why A11y is Awesome".', type: 'Likes', createdAt: new Date(now - 10e7 * 6) }),
    FeedItem.create({ title: 'Alice sent you a private message.', type: 'Messages', createdAt: new Date(now - 10e7 * 4) }),
    FeedItem.create({ title: 'Tony Stark liked your post "Why A11y is Awesome".', type: 'Likes', createdAt: new Date(now - 10e7 * 2) }),
    FeedItem.create({ title: 'Zoey sent you a private message.', type: 'Messages', createdAt: new Date() })
  ]);

  if (filter) {
    base = base.filter(function(item) {
      return item.type.toLowerCase() === filter.toLowerCase();
    });
  }

  return base;
}

export default Route.extend({
  queryParams: {
    filter: { refreshModel: true },
    sort: { refreshModel: false },
    direction: { refreshModel: false }
  },

  model({ filter }) {
    return createFeed(filter);
  }

});
