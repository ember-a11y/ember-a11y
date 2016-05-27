import Ember from 'ember';

const {
  Route,
  Object: EmberObject,
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

  model({ title, type }) {
    const feedItems = type ?
      this._createFeedItems().filter(item => item.get('type').toLowerCase() === type.toLowerCase())
      :
      this._createFeedItems();

    const feedItemsSorting = title ? `title:${title}` : '';

    const feedItemsList = FeedItemsList.create({
      feedItemsSorting: [feedItemsSorting],
      feedItems
    });

    return feedItemsList.get('sortedFeedItems');
  },


  _createFeedItems () {
    const now = Date.now();
    return [
      FeedItem.create({ title: 'Nathan liked your post "Why A11y is Awesome".', type: 'Likes', createdAt: new Date(now - 10e7 * 1) }),
      FeedItem.create({ title: 'Tomster sent you a private message.', type: 'Messages', createdAt: new Date(now - 10e7 * 2) }),
      FeedItem.create({ title: 'Tomster liked your post "Why A11y is Awesome".', type: 'Likes', createdAt: new Date(now - 10e7 * 3) }),
      FeedItem.create({ title: 'Alice sent you a private message.', type: 'Messages', createdAt: new Date(now - 10e7 * 4) }),
      FeedItem.create({ title: 'Tony Stark liked your post "Why A11y is Awesome".', type: 'Likes', createdAt: new Date(now - 10e7 * 5) })
    ];
  }
});
