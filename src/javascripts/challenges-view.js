import Backbone from "backbone"
import NavigationManager from "navigation-manager"

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
    let navigationManager = NavigationManager.getInstance()

    this.listenToOnce(navigationManager, "user_attempt_cancel", this.onCancel)
    this.listenToOnce(navigationManager, "user_attempt_skip", this.onConfirm)
    this.listenToOnce(navigationManager, "user_attempt_confirm", this.onConfirm)

    window.challenges = this.collection
  },
  onCancel() {
    let navigationManager = NavigationManager.getInstance()
    navigationManager.destroyDialogView()
  },
  onConfirm() {
  },
})
