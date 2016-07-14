import Backbone from "backbone"

import util from "./util"


export default Backbone.Model.extend({
  initialize(_, options) {
    let { snapshot } = options
    let attributes = snapshot.val()

    // We use today's challenge ID to avoid an error on challenge completion.
    attributes.challenge_id = util.dailyChallengeId
    this.set({ attributes, id: snapshot.key() })
  },

  date() {
    return new Date(this.get("id"))
  },
})
