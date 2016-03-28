import Ember from 'ember';

export function githubIssue([title]/*, hash*/) {
	let titleStr = encodeURIComponent(`Demo App Test fail: ${title}`);
	let linkStr = 
		`https://github.com/nathanhammond/ember-a11y/issues/new?title=${titleStr}`;
  return linkStr;
}

export default Ember.Helper.helper(githubIssue);
