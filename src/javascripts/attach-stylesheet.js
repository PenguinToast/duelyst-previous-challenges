import constants from "pt-constants"


export default function attachStylesheet() {
  let ls = document.createElement("link")
  ls.rel = "stylesheet"
  ls.href = constants.cssPath
  document.getElementsByTagName("head")[0].appendChild(ls)
}
