import dateFormat from "dateformat"


let util = {
  isQuestModal: modal => modal.el.id === "quest-log",
  formatDate: date => dateFormat(date, "UTC:yyyy-mm-dd"),
}

export default util
