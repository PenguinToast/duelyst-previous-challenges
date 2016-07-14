import Backbone from "backbone"
import Firebase from "firebase"

import Challenge from "./challenge"
import util from "./util"


const CHALLENGES_URL = "https://duelyst-production.firebaseio.com/daily-challenges"
const PAGE_SIZE = 6

export default Backbone.Collection.extend({
  model: Challenge,
  comparator: model => -model.date(),

  initialize() {
    this.firebase = new Firebase(CHALLENGES_URL)
    this.lastFetchedDate = new Date()
    this.lastFetchedDate.setUTCHours(0, 0, 0, 0)
    this.fetch()
  },

  fetch() {
    // Don't fetch if currently fetching
    if (!this.lastFetchedDate) {
      return
    }

    let lastFetchedDate = this.lastFetchedDate
    let endingKey = util.formatDate(lastFetchedDate)
    let fetchCount = 0

    this.lastFetchedDate = null
    this.firebase
      .orderByKey()
      .endAt(endingKey)
      .limitToLast(PAGE_SIZE)
      .on("child_added", child => {
        let challenge = new Challenge(null, { snapshot: child })
        this.add(challenge)

        // We have no guarantee for the order of children, so we must count.
        fetchCount += 1
        if (fetchCount === PAGE_SIZE) {
          lastFetchedDate.setUTCDate(lastFetchedDate.getUTCDate() - PAGE_SIZE)
          this.lastFetchedDate = lastFetchedDate
        }
      })
  },
})
