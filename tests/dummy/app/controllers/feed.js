import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['filter', 'sort', 'direction'],
  filter: null,
  sort: null,
  direction: null,

  feedItems: Ember.computed('sort', 'direction', 'model', function() {
    let field = this.get('sort');
    let direction = this.get('direction');
    let model = this.get('model');

    return model.sort(function(a,b) {
      if (direction === 'desc') {
        return a[field] < b[field];
      } else {
        return a[field] > b[field];
      }
    });
  })

});
