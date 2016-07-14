import $ from "jquery"
import NavigationManager from "navigation-manager"

import Challenges from "./challenges"
import ChallengesView from "./challenges-view"
import util from "./util"
import previousChallengesButtonTemplate from "./previous-challenges-button.hbs"
import attachStylesheet from "./attach-stylesheet"


$(() => {
  let navigationManager = NavigationManager.getInstance()

  attachStylesheet()
  navigationManager.listenTo(navigationManager._modalRegion, "show", modal => {
    if (!util.isQuestModal(modal)) {
      return
    }

    modal.on("animated", () => {
      if (!modal._dailyChallengeModel) {
        return
      }

      util.dailyChallengeId = modal._dailyChallengeModel.get("challenge_id")
      $(".daily-challenge .quest-content").append(previousChallengesButtonTemplate())
      $(".pt-show-previous-challenges").click(() => {
        let challengesView = new ChallengesView({ collection: new Challenges() })
        navigationManager.showDialogView(challengesView)
      })
    })
  })
})
