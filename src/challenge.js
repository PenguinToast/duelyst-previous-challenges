import Backbone from "./backbone"


export default class Challenge extends Backbone.Model {
  constructor(attributes, options) {
    super(attributes, options)

    let snapshot = options.snapshot
    this.set({
      date: snapshot.key(),
      attributes: snapshot.val(),
    })
  }
}
