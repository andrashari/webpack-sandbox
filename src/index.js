import { cube } from "./math.js"
import printMe from "./print.js"

function component() {
  const mathElement = document.createElement("pre")
  mathElement.innerHTML = [
    "Hello webpack!",
    "5 cubed is equal to " + cube(5),
  ].join("\n\n")

  const buttonElement = document.createElement("div")
  const btn = document.createElement("button")
  btn.innerHTML = "Click me and check the console!"
  btn.onclick = printMe
  buttonElement.appendChild(btn)

  return buttonElement
}

document.body.appendChild(component())
