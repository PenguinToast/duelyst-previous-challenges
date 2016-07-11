import Backbone from "./backbone"

import challengeViewTemplate from "./challenge-view.hbs"


export default Backbone.Marionette.ItemView.extend({
  template: challengeViewTemplate,
  events: {
    "click": "onClick",
  },
  onClick() {
    console.log(this)
  },
})
