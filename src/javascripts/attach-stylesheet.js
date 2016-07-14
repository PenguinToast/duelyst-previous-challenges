export default function attachStylesheet() {
  let ls = document.createElement("link")
  ls.rel = "stylesheet"
  ls.href = "file:///Users/willsheu/workspace/duelyst-previous-challenges/duelyst-previous-challenges.css"
  document.getElementsByTagName("head")[0].appendChild(ls)
}
