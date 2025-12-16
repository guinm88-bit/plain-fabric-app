function calculate() {
  let width = Number(document.getElementById("width").value);
  let rpi = Number(document.getElementById("rpi").value);
  let length = Number(document.getElementById("length").value);
  let yarnLength = Number(document.getElementById("yarn").value);

  let hanks = (width * rpi * length) / yarnLength;

  document.getElementById("output").innerHTML =
    "Hanks Required: " + hanks.toFixed(2);
}
