// @ifdef DIST
const CSS_PATH = "https://penguintoast.github.io/duelyst-previous-challenges/dist/duelyst-previous-challenges.css"
// @endif
// @ifndef DIST
const CSS_PATH = "file:///Users/willsheu/workspace/duelyst-previous-challenges/build/duelyst-previous-challenges.css"
// @endif

export default function attachStylesheet() {
  let ls = document.createElement("link")
  ls.rel = "stylesheet"
  ls.href = CSS_PATH
  document.getElementsByTagName("head")[0].appendChild(ls)
}
