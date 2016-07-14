import Backbone from "backbone"
import NavigationManager from "navigation-manager"
import EventBus from "event-bus"
import SDK from "sdk"

import ChallengeView from "./challenge-view"
import challengesViewTemplate from "./challenges-view.hbs"


export default Backbone.Marionette.CompositeView.extend({
  id: "pt-challenges-dialog",
  className: "modal prompt-modal",
  template: challengesViewTemplate,
  childView: ChallengeView,
  childViewContainer: ".pt-daily-challenges",
  events: {
    "click .cancel-dialog": "onCancel",
    "click .confirm-dialog": "onConfirm",
  },

  onShow() {
    this.$el.find(".confirm-dialog").prop("disabled", true)

    let navigationManager = NavigationManager.getInstance()

    this.listenToOnce(navigationManager, "user_attempt_cancel", this.onCancel)
    this.listenToOnce(navigationManager, "user_attempt_skip", this.onConfirm)
    this.listenToOnce(navigationManager, "user_attempt_confirm", this.onConfirm)

    this.selectedModel = null
    this.listenTo(this.collection, "selected", this.selectModel)
    this.$childViewContainer.scroll(this.onScroll.bind(this))
  },

  selectModel(model) {
    if (this.selectedModel) {
      this.selectedModel.trigger("deselected")
    }
    else {
      this.$el.find(".confirm-dialog").prop("disabled", false)
    }

    this.selectedModel = model
  },

  onCancel() {
    let navigationManager = NavigationManager.getInstance()
    navigationManager.destroyDialogView()
  },

  onConfirm() {
    let eventBus = EventBus.getInstance()
    window.challenge = this.selectedModel.get("attributes")
    SDK.ChallengeRemote
      .loadAndCreateFromModelData(this.selectedModel.get("attributes"))
      .then(challengeData => {
        eventBus.trigger("start_challenge", challengeData)
      })
  },

  onScroll() {
    let $container = this.$childViewContainer

    if ($container[0].scrollHeight - $container.scrollTop() ===
        $container.innerHeight()) {
      this.collection.fetch()
    }
  },
})
