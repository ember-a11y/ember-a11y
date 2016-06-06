import Ember from 'ember';

const { Route, Object: EmberObject, A } = Ember;

const User = EmberObject.extend({
  name: null
});

const users = [
  'Ben Holmes',
  'Brian Sipple',
  'George Chapman',
  'Jamie White',
  'Ricardo Mendes',
  'Melanie Sumner',
  'Nathan Hammond',
  'Suz Hinton',
  'Robert DeLuca',
  'David Peter',
  'Sivakumar Kailasam',
  'Trent Willis',
  'Will Hastings'
];

export default Route.extend({

  model () {
    return A(users.map(user => User.create({ name: user })));
  }
});
