import Backbone from "./backbone"
import Firebase from "./firebase"

import Challenge from "./challenge"


const CHALLENGES_URL = "https://duelyst-production.firebaseio.com/daily-challenges"

export default class Challenges extends Backbone.Collection {
  static sync = null
  static save = null

  static model = Challenge
  static comparator = "date"

  constructor(models, options) {
    super(models, options)

    this.firebase = new Firebase(CHALLENGES_URL)
    this.firebase.on("child_added", child => {
      this.add(new Challenge(null, { snapshot: child }))
    })
  }
}
