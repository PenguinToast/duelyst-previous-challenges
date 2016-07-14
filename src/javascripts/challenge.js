import Backbone from "backbone"


export default Backbone.Model.extend({
  initialize(_, options) {
    let { snapshot } = options
    this.set({
      id: snapshot.key(),
      attributes: snapshot.val(),
    })
  },

  date() {
    return new Date(this.get("id"))
  },
})
