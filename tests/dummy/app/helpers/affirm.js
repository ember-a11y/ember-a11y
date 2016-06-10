import Ember from 'ember';

const { Helper: { helper } } = Ember;

export function affirm(params/*, hash*/) {
  return (!!params && !!params[0]) ? 'Yes' : 'No';
}

export default helper(affirm);
