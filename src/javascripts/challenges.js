import Backbone from "backbone"
import Firebase from "firebase"

import Challenge from "./challenge"


const CHALLENGES_URL = "https://duelyst-production.firebaseio.com/daily-challenges"

export default Backbone.Collection.extend({
  model: Challenge,
  comparator: model => -model.date(),

  initialize() {
    this.firebase = new Firebase(CHALLENGES_URL)
    let today = "2016-07-13"
    this.firebase.orderByKey().endAt(today).limitToLast(5).on("child_added", child => {
      this.add(new Challenge(null, { snapshot: child }))
    })
  },

  fetch() {
    let today = "2016-07-08"
    this.firebase.orderByKey().endAt(today).limitToLast(5).on("child_added", child => {
      this.add(new Challenge(null, { snapshot: child }))
    })
  },
})
