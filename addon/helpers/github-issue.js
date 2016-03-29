import Ember from 'ember';

export function githubIssue([title]/*, hash*/) {
	let titleStr = encodeURIComponent(`Demo App Test fail: ${title}`);
	let linkEl = document.createElement('a');
	linkEl.href = 
		`https://github.com/nathanhammond/ember-a11y/issues/new?title=${titleStr}`;
	linkEl.appendChild(document.createTextNode('here'));
	let pEl = document.createElement('p');
	pEl.appendChild(document.createTextNode('Did this test fail? Let us know '));
	pEl.appendChild(linkEl);
	pEl.appendChild(document.createTextNode('.'));
	return pEl;
}

export default Ember.Helper.helper(githubIssue);
