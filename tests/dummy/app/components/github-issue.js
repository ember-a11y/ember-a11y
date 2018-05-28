import Component from '@ember/component';
import layout from "../templates/components/github-issue";

export var base = `
### Environment

[//]: # (Describe the environment which resulted in the failure. Please include version numbers!)

**Operating System:**
**Browser:**
**Assistive Tech:**

### Actual Result

[//]: # (Describe what actually happened. Please include the step number that failed!)
`;

export default Component.extend({
  init: function() {
    this._super(...arguments);
    var title = this.get('title');
    if (title) {
      title = "Demo App Issue: " + title;
      this.set('title', encodeURIComponent(title));
    }

    var body = this.get('body');
    if (body) {
      body = base + body + "\r\n\r\n";
    } else {
      body = base + "\r\n";
    }
    this.set('body', encodeURIComponent(body));
  },

  layout
});
