import Ember from 'ember';

const {
  Route,
  Object: EmberObject,
  A,
  computed: { sort }
} = Ember;

const { computed } = Ember;

const FeedItem = EmberObject.extend({
  title: null,
  type: null,
  createdAt: null,
  displayDate: computed('createdAt', function () {
    return `${this.get('createdAt').toDateString()}`;
  })
});

const FeedItemsList = EmberObject.extend({
  feedItems: null,
  feedItemsSorting: [],
  sortedFeedItems: sort('feedItems', 'feedItemsSorting'),
});

export default Route.extend({
  queryParams: {
    title: {
      refreshModel: true,
      replace: true,  // prevents an additional item from being added to browser history
    },
    type: {
      refreshModel: true,
      replace: true,
    },
    createdAt: {
      refreshModel: false,
      replace: true,
    }
  },

  model({ title, type, createdAt }) {
    const titleSorting = title ? `title:${title}` : '';
    const createdAtSorting = createdAt ? `createdAt:${createdAt}` : '';

    let feedItems = this._createFeedItems();
    if (type) {
      feedItems = feedItems.filter(item => item.get('type').toLowerCase() === type.toLowerCase());
    }

    const feedItemsList = FeedItemsList.create({
      feedItemsSorting: [createdAtSorting, titleSorting],
      feedItems
    });
    return feedItemsList.get('sortedFeedItems');
  },

  /**
   * Sample set of feed items -- no particular alphabetical sorting,
   * but we'll start ordered by least-recently created so we can test
   * updating query params to most-recently created
   */
  _createFeedItems() {
    const now = Date.now();

    return A([
      FeedItem.create({ title: 'Nathan liked your post "Why A11y is Awesome".', type: 'Likes', createdAt: new Date(now - 10e7 * 10) }),
      FeedItem.create({ title: 'Tomster sent you a private message.', type: 'Messages', createdAt: new Date(now - 10e7 * 8) }),
      FeedItem.create({ title: 'Tomster liked your post "Why A11y is Awesome".', type: 'Likes', createdAt: new Date(now - 10e7 * 6) }),
      FeedItem.create({ title: 'Alice sent you a private message.', type: 'Messages', createdAt: new Date(now - 10e7 * 4) }),
      FeedItem.create({ title: 'Tony Stark liked your post "Why A11y is Awesome".', type: 'Likes', createdAt: new Date(now - 10e7 * 2) }),
      FeedItem.create({ title: 'Zoey sent you a private message.', type: 'Messages', createdAt: new Date() })
    ]);
  }
});
