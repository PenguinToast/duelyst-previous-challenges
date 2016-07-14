import Backbone from "backbone"

import challengeViewTemplate from "./challenge-view.hbs"


export default Backbone.Marionette.ItemView.extend({
  template: challengeViewTemplate,
  className: "pt-daily-challenge",
  events: {
    "click": "select",
  },

  onShow() {
    let model = this.model

    model.listenTo(model, "deselected", this.deselect.bind(this))
  },

  select() {
    let model = this.model
    model.trigger("selected", model)

    this.$el.addClass("selected")
  },

  deselect() {
    this.$el.removeClass("selected")
  },
})
